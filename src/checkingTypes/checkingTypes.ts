type Expect<T extends [true, string]> = T[1];

// This is a very simple RecordEquals type, but you could extend this type with a typescript mapped type
// to have even more concrete error messages for each key in the objects
type RecordEquals<T1, T2> =
  T1 extends Record<string, unknown>
    ? T2 extends Record<string, unknown>
      ? T2 extends T1
        ? T1 extends T2
          ? [true, 'Ok']
          : [false, 'T1 does not extend T2']
        : [false, 'T2 does not extend T1']
      : [false, 'T2 needs to be a object']
    : [false, 'T1 needs to be a object'];

type Test1 = Expect<RecordEquals<{ a: 'a' }, { a: 'a' }>>;

type Test2 = Expect<RecordEquals<{ a: 'a' }, { a: 'a'; b: 'b' }>>;

type Test3 = Expect<RecordEquals<{ a: 'a' }, { b: 'b' }>>;

type Test4 = Expect<RecordEquals<{ a: 'a'; b: 'b' }, { b: 'b' }>>;

type Test5 = Expect<RecordEquals<string, { b: 'b' }>>;

type Test6 = Expect<RecordEquals<{ a: 'a' }, number>>;
