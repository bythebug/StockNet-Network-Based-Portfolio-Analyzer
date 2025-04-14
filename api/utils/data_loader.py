import pandas as pd
import os
import logging
from typing import Tuple

# Set up logging
logger = logging.getLogger(__name__)

def load_stock_data() -> Tuple[pd.DataFrame, pd.DataFrame]:
    """
    Load stock price data from CSV files
    
    Returns:
        Tuple[pd.DataFrame, pd.DataFrame]: Tuple containing the price data and cleaned price data
    """
    try:
        # Get the project root directory
        project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        logger.info(f"Project root directory: {project_root}")
        
        # Construct paths to data files in the data directory
        data_dir = os.path.join(project_root, 'data')
        historical_data_path = os.path.join(data_dir, 'SNP 500 Price Data 2011-2020.csv')
        validation_data_path = os.path.join(data_dir, 'SNP 500 Price Data 2021.csv')
        
        # Check if files exist
        if not os.path.exists(historical_data_path):
            raise FileNotFoundError(f"Historical data file not found at: {historical_data_path}")
        if not os.path.exists(validation_data_path):
            raise FileNotFoundError(f"Validation data file not found at: {validation_data_path}")
            
        logger.info(f"Loading historical data from: {historical_data_path}")
        # Load data
        price_data = pd.read_csv(historical_data_path, index_col=[0])
        logger.info(f"Loaded {len(price_data.columns)} stocks from historical data")
        
        # Clean data by removing columns with NaN values
        price_data_cleaned = price_data.dropna(axis=1)
        logger.info(f"Cleaned data: {len(price_data_cleaned.columns)} stocks remaining")
        
        return price_data, price_data_cleaned
    except Exception as e:
        logger.error(f"Error loading stock data: {str(e)}")
        raise 