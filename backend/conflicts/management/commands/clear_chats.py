from django.core.management.base import BaseCommand
from conflicts.models import ConflictSession, ChatMessage, AIAnalysisResult, DailyCheckin, ProgressLog

class Command(BaseCommand):
    help = 'Clears all chat and conflict session data, keeping couples linked as freshly paired.'

    def handle(self, *args, **kwargs):
        # Delete all sessions. Due to CASCADE, this deletes messages, analysis results, etc.
        sessions_count, deleted_info = ConflictSession.objects.all().delete()
        
        # In case there are any orphaned messages, though there shouldn't be due to CASCADE
        messages_count, _ = ChatMessage.objects.all().delete()
        
        # Delete analysis results, daily checkins, and progress logs just to be thorough
        analysis_count, _ = AIAnalysisResult.objects.all().delete()
        checkins_count, _ = DailyCheckin.objects.all().delete()
        progress_count, _ = ProgressLog.objects.all().delete()

        self.stdout.write(self.style.SUCCESS(
            f'Successfully cleared chat data.\n'
            f'Deleted ConflictSessions: {sessions_count}\n'
            f'Deleted related objects: {deleted_info}'
        ))
        self.stdout.write(self.style.SUCCESS('All couples are now at the freshly linked stage (no active chat sessions).'))
