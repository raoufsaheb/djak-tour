import { describe, it, expect } from 'vitest';
import {
  mockUsers,
  mockJamiyas,
  mockBookings,
  mockActiveMemberships,
  mockTransactions,
  mockNotifications,
  formatCurrency,
  formatDate,
  formatTime,
  getJamiyaStatusText,
  getJamiyaStatusColor,
  getIncomeLevelText,
  getKYCStatusText,
} from '../mockData';

describe('mockData', () => {
  describe('mockUsers', () => {
    it('has 8 users', () => {
      expect(mockUsers).toHaveLength(8);
    });

    it('has users with different KYC statuses', () => {
      const verified = mockUsers.filter(u => u.kycStatus === 'verified');
      const pending = mockUsers.filter(u => u.kycStatus === 'pending');
      const unverified = mockUsers.filter(u => u.kycStatus === 'unverified');

      expect(verified.length).toBeGreaterThan(0);
      expect(pending.length).toBeGreaterThan(0);
      expect(unverified.length).toBeGreaterThan(0);
    });
  });

  describe('mockJamiyas', () => {
    it('has 5 jamiyas', () => {
      expect(mockJamiyas).toHaveLength(5);
    });

    it('has jamiyas with different statuses', () => {
      const open = mockJamiyas.filter(j => j.status === 'open');
      const active = mockJamiyas.filter(j => j.status === 'active');
      const completed = mockJamiyas.filter(j => j.status === 'completed');

      expect(open.length).toBeGreaterThan(0);
      expect(active.length).toBeGreaterThan(0);
      expect(completed.length).toBeGreaterThan(0);
    });
  });

  describe('formatCurrency', () => {
    it('formats amount correctly', () => {
      expect(formatCurrency(10000)).toBe('10,000 دج');
      expect(formatCurrency(250000)).toBe('250,000 دج');
    });
  });

  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2025-01-15T10:30:00Z';
      const formatted = formatDate(date);
      expect(formatted).toContain('2025');
      expect(formatted).toContain('يناير');
    });
  });

  describe('formatTime', () => {
    it('formats time correctly', () => {
      const date = '2025-01-15T10:30:00Z';
      const formatted = formatTime(date);
      expect(formatted).toMatch(/\d{2}:\d{2}/);
    });
  });

  describe('getJamiyaStatusText', () => {
    it('returns correct text for each status', () => {
      expect(getJamiyaStatusText('open')).toBe('مفتوحة');
      expect(getJamiyaStatusText('active')).toBe('نشطة');
      expect(getJamiyaStatusText('completed')).toBe('مكتملة');
    });
  });

  describe('getJamiyaStatusColor', () => {
    it('returns correct color for each status', () => {
      expect(getJamiyaStatusColor('open')).toBe('#2E7D32');
      expect(getJamiyaStatusColor('active')).toBe('#0D47A1');
      expect(getJamiyaStatusColor('completed')).toBe('#1B5E20');
    });
  });

  describe('getIncomeLevelText', () => {
    it('returns correct text for each level', () => {
      expect(getIncomeLevelText('low')).toBe('أقل من 50,000 دج');
      expect(getIncomeLevelText('medium')).toBe('50,000 - 100,000 دج');
      expect(getIncomeLevelText('high')).toBe('100,000 - 200,000 دج');
      expect(getIncomeLevelText('very_high')).toBe('200,000+ دج');
    });
  });

  describe('getKYCStatusText', () => {
    it('returns correct text for each status', () => {
      expect(getKYCStatusText('unverified')).toBe('غير موثق');
      expect(getKYCStatusText('pending')).toBe('قيد المراجعة');
      expect(getKYCStatusText('verified')).toBe('موثق');
    });
  });
});
