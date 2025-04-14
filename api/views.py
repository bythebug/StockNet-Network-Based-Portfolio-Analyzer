from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .stock_analysis import StockAnalyzer
import logging
import traceback

# Set up logging
logger = logging.getLogger(__name__)

# Create your views here.

class StockAnalysisView(APIView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.analyzer = StockAnalyzer()

    def get(self, request):
        try:
            # Get portfolio suggestions
            portfolios = self.analyzer.get_portfolio_suggestions()
            
            # Get performance metrics for each portfolio
            central_performance = self.analyzer.get_portfolio_performance(portfolios['central_portfolio'])
            peripheral_performance = self.analyzer.get_portfolio_performance(portfolios['peripheral_portfolio'])
            
            return Response({
                'portfolios': portfolios,
                'performance': {
                    'central': central_performance,
                    'peripheral': peripheral_performance
                }
            })
        except FileNotFoundError as e:
            logger.error(f"Data file not found: {str(e)}")
            return Response(
                {'error': 'Required data files not found. Please check if the CSV files exist.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            logger.error(f"Error in stock analysis: {str(e)}\n{traceback.format_exc()}")
            return Response(
                {'error': f'An error occurred during analysis: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
