import { describe, it, expect } from 'vitest';
import {
  cn,
  formatDZD,
  isValidAlgerianPhone,
  isValidEmail,
  getPasswordStrength,
  truncateText,
  daysBetween,
  isExpired,
  formatCountdown,
} from '../utils';

describe('cn', () => {
  it('merges classes correctly', () => {
    expect(cn('btn', 'btn-primary')).toBe('btn btn-primary');
  });

  it('handles conditional classes', () => {
    expect(cn('btn', { 'btn-lg': true, 'btn-sm': false })).toBe('btn btn-lg');
  });
});

describe('formatDZD', () => {
  it('formats amount correctly', () => {
    expect(formatDZD(10000)).toBe('10,000 دج');
    expect(formatDZD(250000)).toBe('250,000 دج');
  });
});

describe('isValidAlgerianPhone', () => {
  it('validates correct phone numbers', () => {
    expect(isValidAlgerianPhone('+213550123456')).toBe(true);
    expect(isValidAlgerianPhone('0550123456')).toBe(true);
  });

  it('rejects invalid phone numbers', () => {
    expect(isValidAlgerianPhone('123456')).toBe(false);
    expect(isValidAlgerianPhone('invalid')).toBe(false);
  });
});

describe('isValidEmail', () => {
  it('validates correct emails', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user@domain.co')).toBe(true);
  });

  it('rejects invalid emails', () => {
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });
});

describe('getPasswordStrength', () => {
  it('returns weak for short passwords', () => {
    const result = getPasswordStrength('123');
    expect(result.score).toBe(0);
    expect(result.label).toBe('ضعيفة جداً');
  });

  it('returns strong for complex passwords', () => {
    const result = getPasswordStrength('StrongPass123!');
    expect(result.score).toBeGreaterThan(3);
    expect(result.label).toBe('قوية');
  });
});

describe('truncateText', () => {
  it('truncates long text', () => {
    expect(truncateText('This is a very long text', 10)).toBe('This is a ...');
  });

  it('returns original text if short enough', () => {
    expect(truncateText('Short', 10)).toBe('Short');
  });
});

describe('daysBetween', () => {
  it('calculates days correctly', () => {
    const date1 = new Date('2025-01-01');
    const date2 = new Date('2025-01-10');
    expect(daysBetween(date1, date2)).toBe(9);
  });
});

describe('isExpired', () => {
  it('returns true for past dates', () => {
    const pastDate = new Date('2020-01-01');
    expect(isExpired(pastDate)).toBe(true);
  });

  it('returns false for future dates', () => {
    const futureDate = new Date('2030-01-01');
    expect(isExpired(futureDate)).toBe(false);
  });
});

describe('formatCountdown', () => {
  it('formats seconds correctly', () => {
    expect(formatCountdown(3661)).toBe('01:01:01');
    expect(formatCountdown(59)).toBe('00:00:59');
  });
});
