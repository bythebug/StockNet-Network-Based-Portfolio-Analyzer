import pandas as pd
import numpy as np
import networkx as nx
from typing import Dict, List, Tuple
from .utils.data_loader import load_stock_data

class StockAnalyzer:
    def __init__(self):
        # Load historical data
        self.price_data, self.price_data_cleaned = load_stock_data()
        
    def compute_log_returns(self) -> pd.DataFrame:
        """Compute log returns for the entire dataset."""
        return np.log(self.price_data_cleaned.shift(1)) - np.log(self.price_data_cleaned)
        
    def compute_correlation_matrix(self, log_returns: pd.DataFrame) -> pd.DataFrame:
        """Compute correlation matrix from log returns."""
        return log_returns.corr()
        
    def create_filtered_network(self, correlation_matrix: pd.DataFrame) -> nx.Graph:
        """Create and filter network using MST."""
        distance_matrix = np.sqrt(2 * (1 - correlation_matrix))
        distance_graph = nx.Graph(distance_matrix)
        return nx.minimum_spanning_tree(distance_graph)
        
    def compute_centrality_measures(self, graph: nx.Graph) -> Dict[str, Dict[str, float]]:
        """Compute various centrality measures for the network."""
        return {
            'degree': nx.degree_centrality(graph),
            'betweenness': nx.betweenness_centrality(graph),
            'closeness': nx.closeness_centrality(graph)
        }

    def get_stock_metrics(self, symbol: str) -> Dict[str, float]:
        """Calculate individual stock metrics."""
        if symbol not in self.price_data_cleaned.columns:
            return {}
        
        # Get stock price data
        stock_data = self.price_data_cleaned[symbol]
        
        # Calculate returns
        returns = stock_data.pct_change().dropna()
        
        # Calculate metrics
        avg_return = float(returns.mean())
        volatility = float(returns.std())
        sharpe = float(avg_return / volatility if volatility != 0 else 0)
        
        return {
            'expected_return': avg_return,
            'risk': volatility,
            'sharpe_ratio': sharpe
        }
        
    def get_portfolio_suggestions(self) -> Dict[str, List[Dict[str, any]]]:
        """Get central and peripheral portfolio suggestions with individual stock metrics."""
        # Compute all necessary metrics
        log_returns = self.compute_log_returns()
        correlation_matrix = self.compute_correlation_matrix(log_returns)
        filtered_network = self.create_filtered_network(correlation_matrix)
        centrality_measures = self.compute_centrality_measures(filtered_network)
        
        # Combine centrality scores
        combined_scores = {}
        for stock in centrality_measures['degree'].keys():
            combined_scores[stock] = (
                centrality_measures['degree'][stock] + 
                centrality_measures['betweenness'][stock]
            ) / 2
            
        # Sort stocks by combined centrality
        sorted_stocks = sorted(combined_scores.items(), key=lambda x: x[1], reverse=True)
        
        # Get top 15 central and bottom 15 peripheral stocks with their metrics
        central_portfolio = []
        peripheral_portfolio = []
        
        for stock, score in sorted_stocks[:15]:
            metrics = self.get_stock_metrics(stock)
            central_portfolio.append({
                'symbol': stock,
                'centrality_score': score,
                **metrics
            })
            
        for stock, score in sorted_stocks[-15:]:
            metrics = self.get_stock_metrics(stock)
            peripheral_portfolio.append({
                'symbol': stock,
                'centrality_score': score,
                **metrics
            })
        
        return {
            'central_portfolio': central_portfolio,
            'peripheral_portfolio': peripheral_portfolio
        }

    def get_portfolio_performance(self, portfolio: List[Dict[str, any]]) -> Dict[str, float]:
        """Calculate portfolio performance metrics."""
        if not portfolio:
            return {}
            
        # Extract symbols from portfolio
        symbols = [stock['symbol'] for stock in portfolio]
        
        # Get relevant price data
        portfolio_data = self.price_data_cleaned[symbols]
        
        # Calculate basic metrics
        returns = portfolio_data.pct_change()
        avg_return = returns.mean()
        volatility = returns.std()
        
        return {
            'average_return': float(avg_return.mean()),
            'volatility': float(volatility.mean()),
            'sharpe_ratio': float(avg_return.mean() / volatility.mean() if volatility.mean() != 0 else 0)
        } 