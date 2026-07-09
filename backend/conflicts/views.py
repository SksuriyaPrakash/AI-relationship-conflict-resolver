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
        
        # We enforce a single persistent session per couple.
        active_session = ConflictSession.objects.filter(couple=couple).order_by('created_at').first()
        
        if active_session:
            serializer = self.get_serializer(active_session)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
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
        from django.utils import timezone
        
        # Default user to request user
        checkin = serializer.save(user=self.request.user)
        session = checkin.session
        couple = session.couple
        today = timezone.now().date()
        
        p1_checkin = DailyCheckin.objects.filter(session=session, user=couple.partner_1, date=today).first()
        p2_checkin = DailyCheckin.objects.filter(session=session, user=couple.partner_2, date=today).first()
        
        # If either says "partial" or "no", reopen immediately
        if checkin.status in ["partial", "no"]:
            session.status = "collecting"
            session.save()
            ProgressLog.objects.create(
                session=session,
                percentage=0,
                milestone="Conflict reopened based on daily checkin."
            )
        elif p1_checkin and p2_checkin:
            if p1_checkin.status == "resolved" and p2_checkin.status == "resolved":
                session.status = "resolved"
                session.save()
                
                severity_deduction = 10
                if hasattr(session, 'analysis_result'):
                    severity = session.analysis_result.severity
                    if severity == "critical": severity_deduction = 20
                    elif severity == "high": severity_deduction = 15
                    elif severity == "medium": severity_deduction = 10
                    elif severity == "low": severity_deduction = 5
                    
                ProgressLog.objects.create(
                    session=session,
                    percentage=severity_deduction,
                    milestone="Both partners marked conflict as resolved."
                )

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
