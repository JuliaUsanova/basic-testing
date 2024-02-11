import { simpleCalculator, Action } from './index';

describe('simpleCalculator', () => {
  const table = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 5, b: 2, action: Action.Subtract, expected: 3 },
    { a: 7, b: 3, action: Action.Subtract, expected: 4 },
    { a: 10, b: 5, action: Action.Subtract, expected: 5 },
    { a: 1, b: 2, action: Action.Divide, expected: 0.5 },
    { a: 2, b: 2, action: Action.Divide, expected: 1 },
    { a: 4, b: 2, action: Action.Divide, expected: 2 },
    { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
    { a: 1, b: 2, action: Action.Multiply, expected: 2 },
    { a: 2, b: 2, action: Action.Multiply, expected: 4 },
    { a: 3, b: 2, action: Action.Multiply, expected: 6 },
    { a: 'name', b: 2, action: Action.Add, expected: null },
    { a: 2, b: 'day', action: Action.Add, expected: null },
    { a: 3, b: 2, action: 'Withdraw', expected: null },
    { a: 3, b: 0, action: Action.Divide, expected: Infinity },
  ];

  it.each(table)(
    'simpleCalculator({$a, $b, $action}) = %d',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
