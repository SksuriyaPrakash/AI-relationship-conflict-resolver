import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    LANGUAGE_CHOICES = [
        ("english", "English"),
        ("tamil", "Tamil"),
    ]
    phone = models.CharField(max_length=15, blank=True)
    occupation = models.CharField(max_length=100, blank=True)
    language_preference = models.CharField(
        max_length=10,
        choices=LANGUAGE_CHOICES,
        default="english"
    )
    invite_token = models.UUIDField(default=uuid.uuid4, unique=True)

    def __str__(self):
        return self.username

class CoupleProfile(models.Model):
    partner_1 = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="couple_profile_as_p1"
    )
    partner_2 = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="couple_profile_as_p2",
        null=True,
        blank=True
    )
    relationship_duration = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        p1 = self.partner_1.username
        p2 = self.partner_2.username if self.partner_2 else "Pending Invitation"
        return f"Couple: {p1} & {p2}"
