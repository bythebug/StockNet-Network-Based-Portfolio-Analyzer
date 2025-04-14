# StockNet-Network-Based-Portfolio-Analyzer
A sophisticated web application for analyzing S&P 500 stocks using network analysis techniques to identify market leaders and independent movers. This project helps investors understand stock market dynamics by visualizing relationships between stocks and suggesting portfolio strategies.

Core Contributors: Jasmin, Suraj, Megha, Anupreet and Ivana.

## Features

- **Network Analysis**: Identifies stocks that are highly connected within the market network (Market Leaders) and those with more independent price movements (Independent Movers).
- **Performance Metrics**: Calculates expected returns, risk levels, and Sharpe ratios for each stock.
- **Advanced Visualizations**: 
  - Portfolio Composition Pie Chart
  - Risk-Return Scatter Plot
  - Performance Distribution Chart
  - Cumulative Returns Chart
- **Interactive UI**: Modern, responsive interface built with Material-UI and React.

## Project Structure

```
root/
├── api/                  # Django backend API
│   ├── utils/            # Utility functions
│   │   └── data_loader.py # Data loading utilities
│   ├── tests/            # Backend tests
│   ├── views.py          # API endpoints
│   ├── urls.py           # URL routing
│   └── stock_analysis.py # Stock analysis logic
├── frontend/             # React frontend
│   ├── src/              # Source code
│   │   ├── components/   # React components
│   │   │   ├── AdvancedCharts.js # Advanced visualization components
│   │   │   ├── PortfolioCard.js  # Portfolio display component
│   │   │   └── PerformanceChart.js # Performance visualization
│   │   ├── utils/        # Utility functions
│   │   │   ├── api.js    # API communication
│   │   │   └── formatters.js # Data formatting utilities
│   │   ├── hooks/        # Custom React hooks
│   │   └── assets/       # Static assets
│   ├── public/           # Public assets
│   └── package.json      # Frontend dependencies
├── data/                 # Data files
│   ├── SNP 500 Price Data 2011-2020.csv # Historical data
│   └── SNP 500 Price Data 2021.csv      # Validation data
├── stockanalysis/        # Django project settings
├── manage.py             # Django management script
├── requirements.txt      # Python dependencies
└── .env                  # Environment variables
```

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/RichGirls.git
   cd RichGirls
   ```

2. Install backend dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

4. Create environment files:
   - Copy `.env.example` to `.env` in the root directory
   - Copy `frontend/.env.example` to `frontend/.env`

### Running the Application

1. Start the Django backend:
   ```
   python manage.py runserver 8002
   ```

2. Start the React frontend:
   ```
   cd frontend
   npm start
   ```

3. Access the application at http://localhost:3000

## API Endpoints

- `GET /api/analysis/`: Returns portfolio suggestions and performance metrics

## Data Analysis Methodology

The application uses the following steps to analyze stocks:

1. **Data Loading**: Loads historical S&P 500 price data from 2011-2020
2. **Network Construction**: Creates a network of stocks based on price correlations
3. **Centrality Analysis**: Identifies stocks with high centrality (Market Leaders) and low centrality (Independent Movers)
4. **Performance Calculation**: Computes expected returns, risk levels, and Sharpe ratios
5. **Validation**: Tests the strategy against 2021 data

## Technologies Used

- **Backend**: 
  - Django & Django REST Framework
  - Pandas for data manipulation
  - NetworkX for network analysis
  - NumPy for numerical computations

- **Frontend**: 
  - React for UI components
  - Material-UI for styling
  - Recharts for data visualization
  - Axios for API communication

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
