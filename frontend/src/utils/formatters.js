/**
 * Formats a number as a percentage with 2 decimal places
 * @param {number} value - The value to format
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value) => `${(value * 100).toFixed(2)}%`;

/**
 * Formats a number with 3 decimal places
 * @param {number} value - The value to format
 * @returns {string} Formatted number string
 */
export const formatScore = (value) => value.toFixed(3); 