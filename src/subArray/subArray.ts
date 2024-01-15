// This is not finished, not conclusions yet

enum Operator {
  A = 'A',
  B = 'B',
}

type Summarize<T extends Operator = Operator> = {
  operator: T;
  options: readonly string[];
};

export type SelectedSummarize<
  T extends Operator = Operator,
  U extends Summarize<T> = Summarize<T>,
> = {
  operator: U['operator'];
  options: U['options'][number][];
};

const sA = {
  operator: Operator.A,
  options: ['a', 'aa', 'aaa'] as const,
};

const sB: Summarize<Operator.B> = {
  operator: Operator.B,
  options: ['b', 'bb', 'bbb'] as const,
};

const selectedA: SelectedSummarize<(typeof sA)['operator'], typeof sA> = {
  operator: sA.operator,
  options: ['b', 'bb', 'bbb', 'ccc'],
};

console.log(sA);
console.log(sB);
console.log(selectedA);

const foo = (
  summarize: SelectedSummarize<Summarize['operator'], Summarize>
) => {
  const op1 = summarize.operator;

  // after some runtimechecks
  if (summarize.operator === Operator.A) {
    const operator = summarize.operator;
    const options = summarize.options;
    options.push('bb');
  }
};

type asdfasdf = typeof sA;
