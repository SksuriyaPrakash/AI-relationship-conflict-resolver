from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CoupleProfile

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    is_partner_added = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'occupation', 'gender', 'profile_pic', 'language_preference', 'invite_token', 'is_partner_added')
        read_only_fields = ('invite_token',)

    def get_is_partner_added(self, obj):
        from django.db.models import Q
        return CoupleProfile.objects.filter(
            Q(partner_1=obj, partner_2__isnull=False) | Q(partner_2=obj)
        ).exists()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    invite_code = serializers.UUIDField(required=False, write_only=True)
    relationship_duration = serializers.IntegerField(required=False, write_only=True, default=0)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'phone', 'occupation', 'gender', 'profile_pic', 'language_preference', 'invite_code', 'relationship_duration')

    def create(self, validated_data):
        invite_code = validated_data.pop('invite_code', None)
        relationship_duration = validated_data.pop('relationship_duration', 0)
        password = validated_data.pop('password')
        
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()

        if invite_code:
            try:
                partner = User.objects.get(invite_token=invite_code)
                # Check if partner is already partner_1 in an existing CoupleProfile
                profile, created = CoupleProfile.objects.get_or_create(
                    partner_1=partner,
                    defaults={'partner_2': user, 'relationship_duration': relationship_duration}
                )
                if not created:
                    if profile.partner_2 is None:
                        profile.partner_2 = user
                        if relationship_duration:
                            profile.relationship_duration = relationship_duration
                        profile.save()
                    else:
                        # Fallback: if already has partner_2, create a new one where this user is partner_2
                        # or raise validation error. Better to create if possible, or raise.
                        raise serializers.ValidationError("This invitation code has already been used to link a couple.")
            except User.DoesNotExist:
                raise serializers.ValidationError({"invite_code": "Invalid invitation code."})
        else:
            # Create a profile with partner_1 only, partner_2 registers later
            CoupleProfile.objects.create(partner_1=user, relationship_duration=relationship_duration)
            
        return user

class CoupleProfileSerializer(serializers.ModelSerializer):
    partner_1 = UserSerializer(read_only=True)
    partner_2 = UserSerializer(read_only=True)

    class Meta:
        model = CoupleProfile
        fields = ('id', 'partner_1', 'partner_2', 'relationship_duration', 'created_at')
