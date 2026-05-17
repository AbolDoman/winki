export const otpValidation = {
  validate: (otp: string) => {
    if (!otp || otp.length !== 6) {
      return 'لطفا کد تایید 6 رقمی را وارد کنید';
    }

    if (!/^\d{6}$/.test(otp)) {
      return 'کد تایید فقط باید شامل اعداد باشد';
    }

    return null;
  },

  isComplete: (otp: string) => {
    return otp.length === 6 && /^\d{6}$/.test(otp);
  },
};
