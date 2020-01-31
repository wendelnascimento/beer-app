import { act, renderHook } from '@testing-library/react-hooks';
import wait from 'waait';

import useDebounce from '../useDebounce';

describe('useDebounce()', () => {
  it('should return desired value after the specified time', async () => {
    const value = renderHook(() => useDebounce('test value', 300));

    await act(async () => {
      await wait(300);
    });

    expect(value.result.current).toEqual('test value');
  });

  it('should not return the desired value before the specified time', async () => {
    const value = renderHook(() => useDebounce('test value', 300));

    await act(async () => {
      await wait(200);
    });

    expect(value.result.current).not.toEqual('test value');
  });
});
