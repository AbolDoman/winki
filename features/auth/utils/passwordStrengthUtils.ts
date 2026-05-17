export interface PasswordStrength {
  hasNumber: boolean;
  hasMinLength: boolean;
  hasSpecialChar: boolean;
  hasUpperLower: boolean;
}

export const passwordStrengthUtils = {
  checkPasswordStrength: (pwd: string): PasswordStrength => {
    const hasNumber = /\d/.test(pwd);
    const hasMinLength = pwd.length >= 8;
    const hasSpecialChar = /[@$!%*?&#]/.test(pwd);
    const hasUpperLower = /[a-z]/.test(pwd) && /[A-Z]/.test(pwd);

    return { hasNumber, hasMinLength, hasSpecialChar, hasUpperLower };
  },

  getValidCount: (strength: PasswordStrength): number => {
    return Object.values(strength).filter(Boolean).length;
  },

  getStrengthColor: (index: number, validCount: number): string => {
    if (index >= validCount) return 'bg-[#E5E7E8]';
    if (validCount === 1) return 'bg-red-500';
    if (validCount === 2) return 'bg-yellow-500';
    if (validCount === 3) return 'bg-green-400';
    return 'bg-green-600';
  },
};
