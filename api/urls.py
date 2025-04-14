from django.urls import path
from .views import StockAnalysisView

urlpatterns = [
    path('analysis/', StockAnalysisView.as_view(), name='stock-analysis'),
] 