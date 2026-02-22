from rest_framework import serializers
from .models import ConflictSession, ChatMessage, AIAnalysisResult, DailyCheckin, ProgressLog
from users.serializers import UserSerializer

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username', read_only=True)

    class Meta:
        model = ChatMessage
        fields = ('id', 'session', 'sender', 'sender_name', 'message', 'is_ai', 'phase', 'status', 'timestamp')
        read_only_fields = ('sender', 'timestamp')

class AIAnalysisResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AIAnalysisResult
        fields = ('id', 'session', 'husband_emotions', 'wife_emotions', 'conflict_type', 'root_cause', 'resolution', 'communication_script', 'is_escalated')

class DailyCheckinSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = DailyCheckin
        fields = ('id', 'session', 'user', 'user_name', 'status', 'note', 'date')
        read_only_fields = ('user', 'date')

class ProgressLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgressLog
        fields = ('id', 'session', 'percentage', 'date', 'milestone')

class ConflictSessionSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)
    analysis_result = AIAnalysisResultSerializer(read_only=True)
    progress_logs = ProgressLogSerializer(many=True, read_only=True)
    daily_checkins = DailyCheckinSerializer(many=True, read_only=True)

    class Meta:
        model = ConflictSession
        fields = ('id', 'couple', 'status', 'created_at', 'messages', 'analysis_result', 'progress_logs', 'daily_checkins')
        read_only_fields = ('couple', 'created_at')
