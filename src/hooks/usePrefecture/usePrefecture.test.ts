import { renderHook, act } from '@testing-library/react-hooks';
import usePrefecture from './usePrefecture';
import { server } from '@/mock/server';
import { MOCK_RESAS_API_KEY, MOCK_NO_RESPONSE } from '@/mock/constants';
import { prefectures } from '@/mock/data/prefecture';

beforeAll(() => server.listen());

beforeEach(() => (process.env.NEXT_PUBLIC_RESAS_API_KEY = MOCK_RESAS_API_KEY));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('usePrefecture', () => {
  test('state: initial', async () => {
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePrefecture());
      expect(result.current.prefectures).toBeUndefined();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe('');

      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
    });
  });

  test('state: loading', async () => {
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePrefecture());

      await waitFor(() => result.current.isLoading === true);
      expect(result.current.prefectures).toBeUndefined();
      expect(result.current.isLoading).toBe(true);
      expect(result.current.errorMessage).toBe('');
      await waitFor(() => result.current.isLoading === false);
    });
  });

  test('state: data fetch', async () => {
    await act(async () => {
      const { result, waitFor } = renderHook(() => usePrefecture());

      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
      expect(result.current.prefectures).toEqual(prefectures);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe('');
    });
  });

  test('state: HTTPError', async () => {
    process.env.NEXT_PUBLIC_RESAS_API_KEY = '';

    await act(async () => {
      const { result, waitFor } = renderHook(() => usePrefecture());

      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
      expect(result.current.prefectures).toBeUndefined;
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe(
        '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
      );
    });
  });

  test('state: Error', async () => {
    process.env.DUMMY_REQUEST = MOCK_NO_RESPONSE;

    await act(async () => {
      const { result, waitFor } = renderHook(() => usePrefecture());

      await waitFor(() => result.current.isLoading === true);
      await waitFor(() => result.current.isLoading === false);
      expect(result.current.prefectures).toBeUndefined;
      expect(result.current.isLoading).toBe(false);
      expect(result.current.errorMessage).toBe(
        '???????????????????????????????????????????????????????????????'
      );
    });
  });
});
