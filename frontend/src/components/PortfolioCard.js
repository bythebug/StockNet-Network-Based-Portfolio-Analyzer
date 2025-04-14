import React, { useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  Tooltip,
  IconButton,
  Card,
  CardContent,
  TableSortLabel
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { formatPercentage } from '../utils/formatters';
import { PORTFOLIO_DESCRIPTIONS, METRIC_DESCRIPTIONS } from '../utils/constants';

/**
 * PortfolioCard component displays a portfolio of stocks with their metrics
 * @param {Object} props - Component props
 * @param {string} props.title - Portfolio title
 * @param {Array} props.stocks - Array of stock objects
 * @param {Object} props.performance - Performance metrics for the portfolio
 * @returns {JSX.Element} PortfolioCard component
 */
const PortfolioCard = ({ title, stocks, performance }) => {
  const [orderBy, setOrderBy] = useState('expected_return');
  const [order, setOrder] = useState('desc');

  /**
   * Handles sorting of the table
   * @param {string} property - Property to sort by
   */
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sort stocks based on current sort settings
  const sortedStocks = [...stocks].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] - b[orderBy];
    } else {
      return b[orderBy] - a[orderBy];
    }
  });

  return (
    <Card elevation={3}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Tooltip title={PORTFOLIO_DESCRIPTIONS[title]} placement="top">
            <IconButton size="small" sx={{ ml: 1 }}>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="h6" gutterBottom>
          Recommended Stocks
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Stock Symbol</TableCell>
                <TableCell align="right">
                  <Tooltip title={METRIC_DESCRIPTIONS.expected_return}>
                    <TableSortLabel
                      active={orderBy === 'expected_return'}
                      direction={orderBy === 'expected_return' ? order : 'asc'}
                      onClick={() => handleRequestSort('expected_return')}
                    >
                      Expected Return
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={METRIC_DESCRIPTIONS.risk}>
                    <TableSortLabel
                      active={orderBy === 'risk'}
                      direction={orderBy === 'risk' ? order : 'asc'}
                      onClick={() => handleRequestSort('risk')}
                    >
                      Risk Level
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedStocks.map((stock) => (
                <TableRow key={stock.symbol}>
                  <TableCell>
                    <Chip 
                      label={stock.symbol}
                      variant="outlined"
                      size="small"
                      color={title.includes("Market Leaders") ? "primary" : "success"}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {formatPercentage(stock.expected_return)}
                  </TableCell>
                  <TableCell align="right">
                    {formatPercentage(stock.risk)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard; 