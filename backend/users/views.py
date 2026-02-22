from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from django.db.models import Q
from .models import CoupleProfile
from .serializers import UserSerializer, RegisterSerializer, CoupleProfileSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user

class CoupleProfileView(generics.RetrieveAPIView):
    serializer_class = CoupleProfileSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        user = self.request.user
        profile = CoupleProfile.objects.filter(Q(partner_1=user) | Q(partner_2=user)).first()
        if not profile:
            # Safe fallback auto-creation
            profile = CoupleProfile.objects.create(partner_1=user)
        return profile
