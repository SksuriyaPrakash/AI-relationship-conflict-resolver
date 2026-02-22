from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ConflictSessionViewSet,
    DailyCheckinViewSet,
    ProgressLogViewSet,
    AIAnalysisResultDetailView
)

router = DefaultRouter()
router.register(r'sessions', ConflictSessionViewSet, basename='session')
router.register(r'checkins', DailyCheckinViewSet, basename='checkin')
router.register(r'progress', ProgressLogViewSet, basename='progress')

urlpatterns = [
    path('', include(router.urls)),
    path('analysis/<int:session_id>/', AIAnalysisResultDetailView.as_view(), name='analysis_detail'),
]
