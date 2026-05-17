declare module 'moment-jalaali' {
  interface JalaliMoment {
    format: (format: string) => string;
  }

  interface LoadPersianOptions {
    dialect?: string;
    usePersianDigits?: boolean;
  }

  interface JalaliMomentFactory {
    (input?: string, format?: string): JalaliMoment;
    loadPersian: (options?: LoadPersianOptions) => void;
  }

  const momentJalaali: JalaliMomentFactory;

  export default momentJalaali;
}
