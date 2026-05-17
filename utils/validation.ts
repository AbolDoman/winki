// Validation patterns
export const VALIDATION_PATTERNS = {
  phone: /^09\d{9}$/,
  nationalId: /^\d{10}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  postalCode: /^\d{10}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
  loginPassword: /^(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}$/,
  persianChars: /[\u0600-\u06FF]/,
};

// Validation messages
export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} الزامی است`,
  invalid: (field: string) => `${field} معتبر نیست`,
  minLength: (field: string, length: number) => `${field} باید حداقل ${length} کاراکتر باشد`,
  maxLength: (field: string, length: number) => `${field} باید حداکثر ${length} کاراکتر باشد`,
  passwordWeak: 'رمز عبور باید شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد',
  passwordPersian: 'رمز عبور باید به زبان انگلیسی باشد',
};

// Validation functions
export const validateNationalId = (value: string): boolean => {
  if (!value || !VALIDATION_PATTERNS.nationalId.test(value)) return false;

  // Check for invalid repeated digits
  if (/^(\d)\1{9}$/.test(value)) return false;

  const check = parseInt(value[9]);
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += parseInt(value[i]) * (10 - i);
  }

  const remainder = sum % 11;
  return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
};

export const validatePhone = (value: string): boolean => {
  if (!value) return false;
  return VALIDATION_PATTERNS.phone.test(value);
};

export const validatePassword = (value: string): boolean => {
  if (!value) return false;
  return VALIDATION_PATTERNS.password.test(value);
};

// Persian to English number conversion
export const convertPersianToEnglish = (str: string): string => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  let result = str;
  for (let i = 0; i < persianNumbers.length; i++) {
    result = result.replace(new RegExp(persianNumbers[i], 'g'), englishNumbers[i]);
  }
  return result;
};

export const validateLoginPassword = (value: string): boolean => {
  if (!value) return false;

  // Convert Persian numbers to English
  const convertedValue = convertPersianToEnglish(value);

  // Check for Persian characters
  if (VALIDATION_PATTERNS.persianChars.test(convertedValue)) {
    return false;
  }

  return convertedValue.length >= 8 && VALIDATION_PATTERNS.loginPassword.test(convertedValue);
};

export const validateEmail = (value: string): boolean => {
  return VALIDATION_PATTERNS.email.test(value);
};

export const validatePostalCode = (value: string): boolean => {
  return VALIDATION_PATTERNS.postalCode.test(value);
};

// React Hook Form validation rules
export const validationRules = {
  firstName: {
    required: VALIDATION_MESSAGES.required('نام'),
    minLength: { value: 2, message: VALIDATION_MESSAGES.minLength('نام', 2) },
  },
  lastName: {
    required: VALIDATION_MESSAGES.required('نام خانوادگی'),
    minLength: { value: 2, message: VALIDATION_MESSAGES.minLength('نام خانوادگی', 2) },
  },
  phone: {
    required: VALIDATION_MESSAGES.required('شماره تماس'),
    validate: (value: string) => validatePhone(value) || VALIDATION_MESSAGES.invalid('شماره تماس'),
  },
  nationalId: {
    required: VALIDATION_MESSAGES.required('کد ملی'),
    validate: (value: string) => validateNationalId(value) || VALIDATION_MESSAGES.invalid('کد ملی'),
  },
  email: {
    required: VALIDATION_MESSAGES.required('ایمیل'),
    validate: (value: string) => validateEmail(value) || VALIDATION_MESSAGES.invalid('ایمیل'),
  },
  postalCode: {
    required: VALIDATION_MESSAGES.required('کد پستی'),
    validate: (value: string) =>
      validatePostalCode(value) || VALIDATION_MESSAGES.invalid('کد پستی'),
  },
  loginPassword: {
    required: VALIDATION_MESSAGES.required('رمز عبور'),
    minLength: { value: 8, message: VALIDATION_MESSAGES.minLength('رمز عبور', 8) },
    validate: (value: string) => {
      const convertedValue = convertPersianToEnglish(value);
      if (VALIDATION_PATTERNS.persianChars.test(convertedValue)) {
        return VALIDATION_MESSAGES.passwordPersian;
      }
      return validateLoginPassword(value) || VALIDATION_MESSAGES.invalid('رمز عبور');
    },
  },
  password: {
    required: VALIDATION_MESSAGES.required('رمز عبور'),
    minLength: { value: 8, message: VALIDATION_MESSAGES.minLength('رمز عبور', 8) },
    validate: (value: string) => validatePassword(value) || VALIDATION_MESSAGES.passwordWeak,
  },
};
