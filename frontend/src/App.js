import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress, Box, Alert, Button } from '@mui/material';
import PortfolioCard from './components/PortfolioCard';
import PerformanceChart from './components/PerformanceChart';
import { fetchStockAnalysis } from './utils/api';

/**
 * Main App component
 * @returns {JSX.Element} App component
 */
function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const responseData = await fetchStockAnalysis();
      setData(responseData);
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={loadData}>
              Retry
            </Button>
          }
        >
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Network Based Stock Portfolio Analysis
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
          Powered by Network Analysis of S&P 500 Stocks (2011-2021)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <PortfolioCard 
            title="Market Leaders" 
            stocks={data?.portfolios?.central_portfolio || []}
            performance={data?.performance?.central || {}}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PortfolioCard 
            title="Independent Movers" 
            stocks={data?.portfolios?.peripheral_portfolio || []}
            performance={data?.performance?.peripheral || {}}
          />
        </Grid>
        <Grid item xs={12}>
          <PerformanceChart 
            centralPerformance={data?.performance?.central || {}}
            peripheralPerformance={data?.performance?.peripheral || {}}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
