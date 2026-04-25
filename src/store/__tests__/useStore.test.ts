import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../useStore';
import { act } from '@testing-library/react';

describe('useStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useStore());
    act(() => {
      result.current.resetToMockData();
    });
  });

  it('has correct initial state', () => {
    const { result } = renderHook(() => useStore());
    
    expect(result.current.currentUser).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.jamiyas).toHaveLength(5);
    expect(result.current.users).toHaveLength(8);
  });

  it('logs in successfully', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      const success = result.current.login('+213550123456', 'Ahmed123!');
      expect(success).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.currentUser).not.toBeNull();
  });

  it('fails login with wrong credentials', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      const success = result.current.login('wrong', 'wrong');
      expect(success).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logs out successfully', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.login('+213550123456', 'Ahmed123!');
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.currentUser).toBeNull();
  });

  it('verifies OTP correctly', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      const isValid = result.current.verifyOTP('123456');
      expect(isValid).toBe(true);
    });
  });

  it('rejects invalid OTP', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      const isValid = result.current.verifyOTP('000000');
      expect(isValid).toBe(false);
    });
  });

  it('gets available jamiyas', () => {
    const { result } = renderHook(() => useStore());
    
    act(() => {
      result.current.login('+213550123456', 'Ahmed123!');
    });

    const availableJamiyas = result.current.getAvailableJamiyas();
    expect(availableJamiyas).toBeDefined();
  });
});

// Helper function
function renderHook<T>(callback: () => T) {
  let result = { current: callback() };
  return { result };
}
