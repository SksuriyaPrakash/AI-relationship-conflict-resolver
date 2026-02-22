from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from users.models import CoupleProfile

User = get_user_model()

class UsersAuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('auth_register')
        self.login_url = reverse('token_obtain_pair')
        self.profile_url = reverse('user_profile')
        self.couple_url = reverse('couple_profile')

    def test_register_and_create_couple(self):
        # 1. Register partner_1
        data1 = {
            "username": "husband1",
            "password": "Password123",
            "email": "husband1@example.com",
            "phone": "1234567890",
            "occupation": "Engineer",
            "language_preference": "english",
            "relationship_duration": 5
        }
        res1 = self.client.post(self.register_url, data1, format='json')
        self.assertEqual(res1.status_code, status.HTTP_201_CREATED)
        
        # Verify user and couple profile created
        p1 = User.objects.get(username="husband1")
        self.assertIsNotNone(p1.invite_token)
        
        profile = CoupleProfile.objects.filter(partner_1=p1).first()
        self.assertIsNotNone(profile)
        self.assertIsNone(profile.partner_2)
        self.assertEqual(profile.relationship_duration, 5)

        # 2. Register partner_2 using invite token from partner_1
        data2 = {
            "username": "wife1",
            "password": "Password123",
            "email": "wife1@example.com",
            "phone": "0987654321",
            "occupation": "Doctor",
            "language_preference": "tamil",
            "invite_code": str(p1.invite_token),
            "relationship_duration": 5
        }
        res2 = self.client.post(self.register_url, data2, format='json')
        self.assertEqual(res2.status_code, status.HTTP_201_CREATED)
        
        # Verify linked couple profile
        p2 = User.objects.get(username="wife1")
        profile.refresh_from_db()
        self.assertEqual(profile.partner_2, p2)

    def test_login_and_retrieve_profile(self):
        # Create user
        user = User.objects.create_user(
            username="testuser",
            password="testpassword",
            email="test@example.com",
            phone="1112223333",
            occupation="Designer"
        )
        CoupleProfile.objects.create(partner_1=user)

        # Get JWT tokens
        login_data = {"username": "testuser", "password": "testpassword"}
        login_res = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(login_res.status_code, status.HTTP_200_OK)
        access_token = login_res.data["access"]

        # Access profile endpoint
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {access_token}')
        profile_res = self.client.get(self.profile_url)
        self.assertEqual(profile_res.status_code, status.HTTP_200_OK)
        self.assertEqual(profile_res.data["username"], "testuser")

        # Access couple endpoint
        couple_res = self.client.get(self.couple_url)
        self.assertEqual(couple_res.status_code, status.HTTP_200_OK)
        self.assertEqual(couple_res.data["partner_1"]["username"], "testuser")
