from django.db import models
from django.conf import settings
from users.models import CoupleProfile

class ConflictSession(models.Model):
    STATUS_CHOICES = [
        ("collecting", "Collecting"),
        ("cross_referencing", "Cross Referencing"),
        ("analyzing", "Analyzing"),
        ("resolved", "Resolved"),
        ("escalated", "Escalated"),
    ]
    couple = models.ForeignKey(CoupleProfile, on_delete=models.CASCADE, related_name="conflict_sessions")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="collecting")
    mismatch_count = models.IntegerField(default=0)
    p1_chat_summary = models.TextField(blank=True)
    p2_chat_summary = models.TextField(blank=True)
    p1_summarized_count = models.IntegerField(default=0)
    p2_summarized_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Session {self.id} - Couple {self.couple.id} ({self.status})"

class ChatMessage(models.Model):
    PHASE_CHOICES = [
        ("individual", "Individual"),
        ("cross_ref", "Cross Reference"),
        ("clarification", "Clarification"),
        ("advice", "Advice"),
        ("escalation", "Escalation"),
    ]
    STATUS_CHOICES = [
        ("sent", "Sent"),
        ("read", "Read"),
        ("waiting", "Waiting"),
    ]
    session = models.ForeignKey(ConflictSession, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="sent_messages")
    visible_to = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name="private_messages")
    message = models.TextField()
    is_ai = models.BooleanField(default=False)
    phase = models.CharField(max_length=20, choices=PHASE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="sent")
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        sender_name = "AI" if self.is_ai else self.sender.username
        return f"Msg {self.id} by {sender_name} in Phase {self.phase}"

class AIAnalysisResult(models.Model):
    session = models.OneToOneField(ConflictSession, on_delete=models.CASCADE, related_name="analysis_result")
    match_percentage = models.IntegerField(default=0)
    severity = models.CharField(max_length=20, default="low")
    husband_emotions = models.JSONField(default=dict)
    wife_emotions = models.JSONField(default=dict)
    conflict_type = models.CharField(max_length=100)
    root_cause = models.TextField()
    resolution = models.TextField()
    communication_script = models.TextField()
    is_escalated = models.BooleanField(default=False)

    def __str__(self):
        return f"Analysis for Session {self.session.id}"

class DailyCheckin(models.Model):
    STATUS_CHOICES = [
        ("resolved", "Resolved"),
        ("partial", "Partially Resolved"),
        ("no", "Not Yet"),
    ]
    session = models.ForeignKey(ConflictSession, on_delete=models.CASCADE, related_name="daily_checkins")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="daily_checkins")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    note = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Checkin {self.date} by {self.user.username} (Session {self.session.id})"

class ProgressLog(models.Model):
    session = models.ForeignKey(ConflictSession, on_delete=models.CASCADE, related_name="progress_logs")
    percentage = models.IntegerField(default=0)
    date = models.DateField(auto_now_add=True)
    milestone = models.CharField(max_length=200)

    def __str__(self):
        return f"Progress {self.percentage}% for Session {self.session.id} ({self.milestone})"
