import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const data = ['first', 'second', 'third'];

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList<string>(data);

    expect(list).toStrictEqual({
      value: 'first',
      next: {
        value: 'second',
        next: {
          value: 'third',
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList<string>(data);

    expect(list).toMatchSnapshot();
  });
});
