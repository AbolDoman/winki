'use client';

import React, { useMemo, useRef, useState } from 'react';

interface OtpInputProps {
  length?: number;
  onComplete: (otp: string) => void;
  onChange?: (otp: string) => void;
  error?: boolean;
  className?: string;
}

function clampIndex(i: number, len: number) {
  if (i < 0) return 0;
  if (i >= len) return len - 1;
  return i;
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, '');
}

const OtpInput = ({ length = 6, onComplete, onChange, error, className = '' }: OtpInputProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const normalizedOtp = useMemo(
    () => Array.from({ length }, (_, i) => otp[i] ?? ''),
    [length, otp],
  );
  const otpValue = useMemo(() => normalizedOtp.join(''), [normalizedOtp]);

  const emitChange = (next: string[]) => {
    const joined = next.join('');
    onChange?.(joined);
    if (next.every((d) => d !== '')) onComplete(joined);
  };

  const focusAt = (index: number) => {
    const i = clampIndex(index, length);
    const el = refs.current[i];
    el?.focus();
    requestAnimationFrame(() => el?.select());
  };

  const applyDigitsFrom = (startIndex: number, digits: string) => {
    const clean = onlyDigits(digits);
    if (!clean) return;

    const next = [...normalizedOtp];
    let writeIndex = clampIndex(startIndex, length);

    for (let i = 0; i < clean.length && writeIndex < length; i += 1) {
      next[writeIndex] = clean[i] ?? '';
      writeIndex += 1;
    }

    setOtp(next);
    emitChange(next);

    const firstEmpty = next.findIndex((d) => d === '');
    if (firstEmpty === -1) {
      focusAt(length - 1);
    } else {
      focusAt(firstEmpty);
    }
  };

  const handleChange = (index: number, raw: string) => {
    const clean = onlyDigits(raw);
    const currentOtp = [...normalizedOtp];

    if (clean.length === 0) {
      currentOtp[index] = '';
      setOtp(currentOtp);
      emitChange(currentOtp);
      return;
    }

    if (clean.length === 1) {
      currentOtp[index] = clean;
      setOtp(currentOtp);
      emitChange(currentOtp);

      if (index < length - 1) focusAt(index + 1);
      return;
    }

    applyDigitsFrom(index, clean);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'Backspace': {
        e.preventDefault();
        const next = [...normalizedOtp];

        if (next[index]) {
          next[index] = '';
          setOtp(next);
          emitChange(next);
          focusAt(index);
          return;
        }

        if (index > 0) {
          next[index - 1] = '';
          setOtp(next);
          emitChange(next);
          focusAt(index - 1);
        }
        return;
      }

      case 'ArrowLeft': {
        e.preventDefault();
        if (index > 0) focusAt(index - 1);
        return;
      }

      case 'ArrowRight': {
        e.preventDefault();
        if (index < length - 1) focusAt(index + 1);
        return;
      }

      case 'Enter': {
        if (normalizedOtp.every((d) => d !== '')) onComplete(otpValue);
        return;
      }

      default:
        return;
    }
  };

  const handlePaste = (index: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text') ?? '';
    applyDigitsFrom(index, text);
  };

  const handleFocus = (index: number) => {
    const firstEmpty = normalizedOtp.findIndex((d) => d === '');
    if (firstEmpty !== -1 && firstEmpty < index) {
      focusAt(firstEmpty);
      return;
    }

    const el = refs.current[index];
    requestAnimationFrame(() => el?.select());
  };

  return (
    <div dir="ltr" className={`flex justify-between gap-3 ${className}`}>
      {normalizedOtp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={() => handleFocus(index)}
          type="tel"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          aria-label={`OTP digit ${index + 1}`}
          maxLength={length}
          className={[
            'size-10 rounded-lg border text-center text-lg font-medium outline-none transition',
            'lg:size-12',
            'focus:ring-2',
            error
              ? 'border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:ring-[var(--color-brand-200)]',
          ].join(' ')}
        />
      ))}
    </div>
  );
};

export default OtpInput;
