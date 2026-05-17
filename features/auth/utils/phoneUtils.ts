const EASTERN_ARABIC_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const ARABIC_INDIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
const ASCII_DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const persianToEnglishDigits = (value: string): string =>
  value
    .split('')
    .map((char) => {
      const persianIndex = EASTERN_ARABIC_DIGITS.indexOf(char);
      if (persianIndex >= 0) return ASCII_DIGITS[persianIndex];

      const arabicIndex = ARABIC_INDIC_DIGITS.indexOf(char);
      if (arabicIndex >= 0) return ASCII_DIGITS[arabicIndex];

      return char;
    })
    .join('');

export const limitPhoneLength = (value: string, maxLength = 11): string =>
  value.length <= maxLength ? value : value.slice(0, maxLength);

export const normalizePhoneInput = (value: string, maxLength = 11): string =>
  limitPhoneLength(persianToEnglishDigits(value).replace(/[^\d]/g, ''), maxLength);
