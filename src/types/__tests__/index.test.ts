import { describe, it, expect } from 'vitest';
import {
  INCOME_LEVELS,
  ACTIVATION_FEE,
  BOOKING_EXPIRY,
  MOCK_OTP_CODE,
  VALID_POST_OFFICE_PATTERNS,
} from '../index';

describe('Types Constants', () => {
  describe('INCOME_LEVELS', () => {
    it('has all income levels', () => {
      expect(INCOME_LEVELS).toHaveProperty('low');
      expect(INCOME_LEVELS).toHaveProperty('medium');
      expect(INCOME_LEVELS).toHaveProperty('high');
      expect(INCOME_LEVELS).toHaveProperty('very_high');
    });

    it('has correct ranges', () => {
      expect(INCOME_LEVELS.low.min).toBe(0);
      expect(INCOME_LEVELS.low.max).toBe(50000);
      expect(INCOME_LEVELS.medium.min).toBe(50000);
      expect(INCOME_LEVELS.medium.max).toBe(100000);
      expect(INCOME_LEVELS.high.min).toBe(100000);
      expect(INCOME_LEVELS.high.max).toBe(200000);
      expect(INCOME_LEVELS.very_high.min).toBe(200000);
      expect(INCOME_LEVELS.very_high.max).toBe(Infinity);
    });
  });

  describe('ACTIVATION_FEE', () => {
    it('is 2000', () => {
      expect(ACTIVATION_FEE).toBe(2000);
    });
  });

  describe('BOOKING_EXPIRY', () => {
    it('is 48 hours in milliseconds', () => {
      expect(BOOKING_EXPIRY).toBe(48 * 60 * 60 * 1000);
    });
  });

  describe('MOCK_OTP_CODE', () => {
    it('is 123456', () => {
      expect(MOCK_OTP_CODE).toBe('123456');
    });
  });

  describe('VALID_POST_OFFICE_PATTERNS', () => {
    it('has valid regex patterns', () => {
      expect(VALID_POST_OFFICE_PATTERNS).toHaveLength(4);
      
      // Test valid patterns
      expect(VALID_POST_OFFICE_PATTERNS[0].test('POST-2025-ALGR-0001')).toBe(true);
      expect(VALID_POST_OFFICE_PATTERNS[1].test('POST-2025-ORAN-0002')).toBe(true);
      
      // Test invalid patterns
      expect(VALID_POST_OFFICE_PATTERNS[0].test('INVALID')).toBe(false);
    });
  });
});
