import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  let bankAccount: BankAccount;

  beforeEach(() => {
    bankAccount = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(bankAccount.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => bankAccount.withdraw(120)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => bankAccount.transfer(120, getBankAccount(100))).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => bankAccount.transfer(20, bankAccount)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(bankAccount.deposit(20).getBalance()).toBe(120);
  });

  test('should withdraw money', () => {
    expect(bankAccount.withdraw(20).getBalance()).toBe(80);
  });

  test('should transfer money', () => {
    expect(() => bankAccount.transfer(20, getBankAccount(100))).toBeTruthy();
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const retryCount = 10;
    const results = await Promise.all(
      Array.from({ length: retryCount }).map(() => bankAccount.fetchBalance()),
    );
    expect(results.some((result) => result === null)).toBeTruthy();
    expect(results.some((result) => typeof result === 'number')).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    bankAccount.deposit(1000000000);
    const balance = bankAccount.getBalance();
    const trySync = async () => {
      try {
        await bankAccount.synchronizeBalance();
      } catch {
        await trySync();
      }
    };
    await trySync();

    const newBalance = bankAccount.getBalance();

    expect(newBalance).toBeGreaterThanOrEqual(0);
    expect(newBalance).not.toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const trySync = async () => {
      try {
        await bankAccount.synchronizeBalance();
        await trySync();
      } catch (e) {
        expect(e).toBeInstanceOf(SynchronizationFailedError);
      }
    };

    await trySync();
  });
});
