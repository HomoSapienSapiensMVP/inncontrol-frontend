import {Expense} from './expense.entity';

describe('ExpenseEntity', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new Expense("","","",1)).toBeTruthy();
  });
});
