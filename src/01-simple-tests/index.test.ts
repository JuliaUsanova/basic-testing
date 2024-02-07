// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const action = Action.Add;
    const a = 1;
    const b = 2;
    expect(simpleCalculator({ a, b, action })).toBe(3);
  });

  test('should subtract two numbers', () => {
    const action = Action.Subtract;
    const a = 3;
    const b = 2;
    expect(simpleCalculator({ a, b, action })).toBe(1);
  });

  test('should multiply two numbers', () => {
    const action = Action.Multiply;
    const a = 3;
    const b = 2;
    expect(simpleCalculator({ a, b, action })).toBe(6);
  });

  test('should divide two numbers', () => {
    const action = Action.Divide;
    const a = 9;
    const b = 2;
    expect(simpleCalculator({ a, b, action })).toBe(4.5);
  });

  test('should exponentiate two numbers', () => {
    const action = Action.Exponentiate;
    const a = 9;
    const b = 2;
    expect(simpleCalculator({ a, b, action })).toBe(81);
  });

  test('should return null for invalid action', () => {
    const action = 'Withdraw' as Action;
    const a = 9;
    const b = 2;
    expect(simpleCalculator({ a, b, action })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const action = Action.Divide;
    const a = '9';
    const b = 2;
    expect(simpleCalculator({ a, b, action })).toBe(null);
  });
});
