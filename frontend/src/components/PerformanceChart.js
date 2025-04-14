import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatPercentage } from '../utils/formatters';
import { Paper, Typography, Box } from '@mui/material';

/**
 * PerformanceChart component displays performance metrics for different portfolios
 * @param {Object} props - Component props
 * @param {Object} props.centralPerformance - Performance metrics for the central portfolio
 * @param {Object} props.peripheralPerformance - Performance metrics for the peripheral portfolio
 * @returns {JSX.Element} PerformanceChart component
 */
const PerformanceChart = ({ centralPerformance, peripheralPerformance }) => {
  // Log the received data for debugging
  console.log('Central Performance:', centralPerformance);
  console.log('Peripheral Performance:', peripheralPerformance);

  const data = [
    {
      name: 'Average Return',
      Central: centralPerformance?.average_return ? centralPerformance.average_return * 100 : 0,
      Peripheral: peripheralPerformance?.average_return ? peripheralPerformance.average_return * 100 : 0,
    },
    {
      name: 'Volatility',
      Central: centralPerformance?.volatility ? centralPerformance.volatility * 100 : 0,
      Peripheral: peripheralPerformance?.volatility ? peripheralPerformance.volatility * 100 : 0,
    },
    {
      name: 'Sharpe Ratio',
      Central: centralPerformance?.sharpe_ratio || 0,
      Peripheral: peripheralPerformance?.sharpe_ratio || 0,
    },
  ];

  /**
   * Custom formatter for tooltip values
   * @param {number} value - The value to format
   * @param {string} name - The name of the metric
   * @returns {string} Formatted value
   */
  const formatTooltipValue = (value, name) => {
    if (name === 'Sharpe Ratio') {
      return value.toFixed(2);
    }
    return formatPercentage(value / 100);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Portfolio Performance Comparison
      </Typography>
      <Box sx={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={formatTooltipValue} />
            <Legend />
            <Bar dataKey="Central" name="Market Leaders" fill="#8884d8" />
            <Bar dataKey="Peripheral" name="Independent Movers" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Market Leaders
          </Typography>
          <Typography variant="body2">
            Avg Return: {formatPercentage(centralPerformance?.average_return || 0)}
          </Typography>
          <Typography variant="body2">
            Volatility: {formatPercentage(centralPerformance?.volatility || 0)}
          </Typography>
          <Typography variant="body2">
            Sharpe Ratio: {centralPerformance?.sharpe_ratio?.toFixed(2) || '0.00'}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            Independent Movers
          </Typography>
          <Typography variant="body2">
            Avg Return: {formatPercentage(peripheralPerformance?.average_return || 0)}
          </Typography>
          <Typography variant="body2">
            Volatility: {formatPercentage(peripheralPerformance?.volatility || 0)}
          </Typography>
          <Typography variant="body2">
            Sharpe Ratio: {peripheralPerformance?.sharpe_ratio?.toFixed(2) || '0.00'}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default PerformanceChart; 