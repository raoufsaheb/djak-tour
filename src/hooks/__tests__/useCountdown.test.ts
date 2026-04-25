import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCountdown } from '../useCountdown';

describe('useCountdown', () => {
  it('initializes with correct values', () => {
    const { result } = renderHook(() =>
      useCountdown({ initialSeconds: 60, autoStart: false })
    );

    expect(result.current.seconds).toBe(60);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.formatted).toBe('00:01:00');
  });

  it('starts countdown', () => {
    const { result } = renderHook(() =>
      useCountdown({ initialSeconds: 60, autoStart: false })
    );

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);
  });

  it('pauses countdown', () => {
    const { result } = renderHook(() =>
      useCountdown({ initialSeconds: 60, autoStart: true })
    );

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);
  });

  it('resets countdown', () => {
    const { result } = renderHook(() =>
      useCountdown({ initialSeconds: 60, autoStart: false })
    );

    act(() => {
      result.current.reset(120);
    });

    expect(result.current.seconds).toBe(120);
    expect(result.current.formatted).toBe('00:02:00');
  });

  it('calls onComplete when finished', () => {
    const onComplete = vi.fn();
    
    renderHook(() =>
      useCountdown({ initialSeconds: 0, autoStart: true, onComplete })
    );

    expect(onComplete).toHaveBeenCalled();
  });
});
