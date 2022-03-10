import { HTTPError } from 'ky';
import getPopulations from './getPopulations';
import {
  MOCK_RESAS_API_KEY,
  MOCK_BAD_REQUEST,
  MOCK_TOO_MANY_REQUESTS,
} from '@/mock/constants';
import { server } from '@/mock/server';
import { populationCategories } from '@/mock/data/population';
import {
  badRequest,
  forbidden,
  tooManyRequests,
} from '@/mock/data/errorResponse';

beforeAll(() => server.listen());

beforeEach(() => (process.env.NEXT_PUBLIC_RESAS_API_KEY = MOCK_RESAS_API_KEY));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe('getPopulations', () => {
  test('request: 200', () => {
    return getPopulations({
      searchParams: { prefCode: 1, cityCode: '-' },
    }).then((data) => {
      expect(data).toEqual(populationCategories);
    });
  });

  test('request: 403', () => {
    process.env.NEXT_PUBLIC_RESAS_API_KEY = '';

    return getPopulations({
      searchParams: { prefCode: 1, cityCode: '-' },
    }).catch(async (err) => {
      expect(err).toBeInstanceOf(HTTPError);
      if (err instanceof HTTPError) {
        expect(err.response.status).toEqual(403);
        expect(await err.response.json()).toEqual(forbidden);
      }
    });
  });

  test('request: 400', () => {
    process.env.DAMMY_REQUEST = MOCK_BAD_REQUEST;

    return getPopulations({
      searchParams: { prefCode: 1, cityCode: '-' },
    }).catch(async (err) => {
      expect(err).toBeInstanceOf(HTTPError);
      if (err instanceof HTTPError) {
        expect(err.response.status).toEqual(400);
        expect(await err.response.json()).toEqual(badRequest);
      }
    });
  });

  test('request: 429', () => {
    process.env.DAMMY_REQUEST = MOCK_TOO_MANY_REQUESTS;

    return getPopulations({
      searchParams: { prefCode: 1, cityCode: '-' },
    }).catch(async (err) => {
      expect(err).toBeInstanceOf(HTTPError);
      if (err instanceof HTTPError) {
        expect(err.response.status).toEqual(429);
        expect(await err.response.json()).toEqual(tooManyRequests);
      }
    });
  });
});
