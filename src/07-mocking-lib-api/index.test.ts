import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const url = '/posts';

  let getMock: jest.Mock<
    Promise<{
      data: never[];
    }>
  >;
  let createMock: jest.Mock;

  beforeEach(() => {
    getMock = jest.fn(() => Promise.resolve({ data: [] }));
    createMock = jest.fn().mockReturnValue({
      get: getMock,
    });
    axios.create = createMock;
  });

  afterEach(() => {
    createMock.mockReset();
    getMock.mockReset();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
    expect(getMock).toHaveBeenCalledWith(url);
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(url);

    expect(getMock).toHaveBeenCalledWith(url);
  });

  test('should return response data', async () => {
    const responseData = await throttledGetDataFromApi(url);

    expect(responseData).toEqual([]);
  });
});
