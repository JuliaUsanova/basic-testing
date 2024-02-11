import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 10000);

    expect(setTimeout).toHaveBeenCalledWith(callback, 10000);

    setTimeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(callback, 10000);

    expect(callback).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 1000);

    expect(setInterval).toHaveBeenCalledWith(callback, 1000);

    setIntervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);

    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = './file.txt';
  const fileContent = 'file content';

  let pathJoinSpy: jest.SpiedFunction<typeof path.join>;
  let existsSyncSpy: jest.SpiedFunction<typeof fs.existsSync>;
  let readFileSpy: jest.SpiedFunction<typeof fsPromises.readFile>;

  beforeEach(() => {
    pathJoinSpy = jest.spyOn(path, 'join');
    existsSyncSpy = jest.spyOn(fs, 'existsSync');
    readFileSpy = jest.spyOn(fsPromises, 'readFile');
  });

  afterEach(() => {
    pathJoinSpy.mockRestore();
    existsSyncSpy.mockRestore();
    readFileSpy.mockRestore();
  });

  test('should call join with pathToFile', async () => {
    await readFileAsynchronously(pathToFile);

    expect(pathJoinSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    pathJoinSpy.mockReturnValue('/path/to/file.txt');
    existsSyncSpy.mockReturnValue(false);

    expect(await readFileAsynchronously(pathToFile)).toBeNull();
    expect(fs.existsSync).toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    existsSyncSpy.mockReturnValue(true);
    readFileSpy.mockImplementation(async () => Buffer.from(fileContent));

    expect(await readFileAsynchronously(pathToFile)).toBe(fileContent);
    expect(fsPromises.readFile).toHaveBeenCalled();
  });
});
