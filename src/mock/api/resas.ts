import { MockedRequest, ResponseResolver, restContext } from 'msw';
import { prefectures } from '@/mock/data/prefecture';
import { populationCategoriesA } from '@/mock/data/population';
import {
  badRequest,
  forbidden,
  tooManyRequests,
} from '@/mock/data/errorResponse';
import {
  MOCK_RESAS_API_KEY,
  MOCK_NO_RESPONSE,
  MOCK_BAD_REQUEST,
  MOCK_TOO_MANY_REQUESTS,
  MOCK_NOT_ALL_POPULATION,
} from '@/mock/constants';

// DUMMY_REQUEST を使うものは擬似的な分岐

export const mockPrefecture: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  if (process.env.DUMMY_REQUEST === MOCK_TOO_MANY_REQUESTS) {
    return res(ctx.status(429), ctx.json(tooManyRequests));
  }

  if (req.headers.get('x-api-key') !== MOCK_RESAS_API_KEY) {
    return res(ctx.status(200), ctx.json(forbidden));
  }

  if (process.env.DUMMY_REQUEST === MOCK_NO_RESPONSE) {
    return res(ctx.status(200), ctx.json({}));
  } else {
    return res(ctx.status(200), ctx.json(prefectures));
  }
};

export const mockPopulation: ResponseResolver<
  MockedRequest,
  typeof restContext
> = (req, res, ctx) => {
  if (process.env.DUMMY_REQUEST === MOCK_TOO_MANY_REQUESTS) {
    return res(ctx.status(429), ctx.json(tooManyRequests));
  }

  if (req.headers.get('x-api-key') !== MOCK_RESAS_API_KEY) {
    return res(ctx.status(200), ctx.json(forbidden));
  }

  if (
    !(
      req.url.searchParams.get('prefCode') &&
      req.url.searchParams.get('cityCode')
    ) ||
    process.env.DUMMY_REQUEST === MOCK_BAD_REQUEST
  ) {
    return res(ctx.status(200), ctx.json(badRequest));
  }

  if (process.env.DUMMY_REQUEST === MOCK_NO_RESPONSE) {
    return res(ctx.status(200), ctx.json({}));
  } else if (process.env.DUMMY_REQUEST === MOCK_NOT_ALL_POPULATION) {
    let dummyData = { ...populationCategoriesA };
    dummyData.result = {
      boundaryYear: dummyData.result?.boundaryYear ?? 2012,
      data: dummyData.result?.data.filter((d) => d.label !== '総人口') ?? [],
    };
    return res(ctx.status(200), ctx.json(dummyData));
  } else {
    return res(ctx.status(200), ctx.json(populationCategoriesA));
  }
};
