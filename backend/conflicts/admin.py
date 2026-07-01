from django.contrib import admin
from .models import *

admin.site.register(ConflictSession)
admin.site.register(ChatMessage)
admin.site.register(AIAnalysisResult)
admin.site.register(DailyCheckin)
admin.site.register(ProgressLog)