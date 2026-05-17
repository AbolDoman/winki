/**
 * Converts English digits to Persian digits
 * @param str - The string containing English digits
 * @returns String with Persian digits
 */
export const toPersianDigits = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return str.replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

/**
 * Formats a number with Persian thousand separators
 * @param num - The number to format
 * @returns Formatted string with Persian separators
 */
export const formatPersianNumber = (num: number | string): string => {
  // Convert to string and remove any non-numeric characters except decimal point
  const cleanNum = String(num).replace(/[^\d.-]/g, '');

  // Split by decimal point if exists
  const parts = cleanNum.split('.');
  const integerPart = parts[0];

  // Add thousand separators to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Convert to Persian digits
  return toPersianDigits(formattedInteger);
};

/**
 * Formats a number with Persian thousand separators and adds "تومان" suffix
 * @param num - The number to format
 * @returns Formatted string with Persian separators and "تومان" suffix
 */
export const formatPersianPrice = (num: number | string): string => {
  const cleanNum = String(num).replace(/[^\d.-]/g, '');

  // Check if the number has a decimal part
  if (cleanNum.includes('.')) {
    const parts = cleanNum.split('.');
    return `${formatPersianNumber(parts[0])} تومان`; // Return only the integer part
  } else {
    return `${formatPersianNumber(cleanNum)} تومان`;
  }
};
