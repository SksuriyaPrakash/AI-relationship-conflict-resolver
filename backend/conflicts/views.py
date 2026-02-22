from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from django.db.models import Q
from users.models import CoupleProfile
from .models import ConflictSession, ChatMessage, AIAnalysisResult, DailyCheckin, ProgressLog
from .serializers import (
    ConflictSessionSerializer,
    DailyCheckinSerializer,
    ProgressLogSerializer,
    AIAnalysisResultSerializer
)

class CoupleContextMixin:
    def get_couple_profile(self):
        user = self.request.user
        return CoupleProfile.objects.filter(Q(partner_1=user) | Q(partner_2=user)).first()

class ConflictSessionViewSet(viewsets.ModelViewSet, CoupleContextMixin):
    serializer_class = ConflictSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        couple = self.get_couple_profile()
        if not couple:
            return ConflictSession.objects.none()
        return ConflictSession.objects.filter(couple=couple).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        couple = self.get_couple_profile()
        if not couple:
            return Response({"detail": "User is not linked to any couple profile."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if there is an active (unresolved/non-escalated) session
        active_session = ConflictSession.objects.filter(
            couple=couple,
            status__in=["collecting", "cross_referencing", "analyzing"]
        ).first()
        
        if active_session:
            return Response(
                {"detail": "You already have an active conflict session.", "session_id": active_session.id},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        session = ConflictSession.objects.create(couple=couple, status="collecting")
        
        # Create initial progress log
        ProgressLog.objects.create(
            session=session,
            percentage=10,
            milestone="Conflict session created. Initial chat phase started."
        )
        
        serializer = self.get_serializer(session)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class DailyCheckinViewSet(viewsets.ModelViewSet, CoupleContextMixin):
    serializer_class = DailyCheckinSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        couple = self.get_couple_profile()
        if not couple:
            return DailyCheckin.objects.none()
        return DailyCheckin.objects.filter(session__couple=couple).order_by('-date')

    def perform_create(self, serializer):
        # Default user to request user
        serializer.save(user=self.request.user)

class ProgressLogViewSet(viewsets.ReadOnlyModelViewSet, CoupleContextMixin):
    serializer_class = ProgressLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        couple = self.get_couple_profile()
        if not couple:
            return ProgressLog.objects.none()
        return ProgressLog.objects.filter(session__couple=couple).order_by('date', 'id')

class AIAnalysisResultDetailView(generics.RetrieveAPIView, CoupleContextMixin):
    serializer_class = AIAnalysisResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'session_id'

    def get_queryset(self):
        couple = self.get_couple_profile()
        if not couple:
            return AIAnalysisResult.objects.none()
        return AIAnalysisResult.objects.filter(session__couple=couple)
