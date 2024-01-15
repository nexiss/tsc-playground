export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object | undefined
      ? RecursivePartial<T[P]>
      : T[P];
};

type MyType = {
  attr1: MyType | null;
  attr12?: MyType;
  attr2: number;
  attr22?: number;
  attr3: string;
  attr32?: string;
};

const fn = (myPartial: RecursivePartial<MyType>): MyType => {
  console.log(myPartial.attr1.attr1.attr12.attr1);
  // TODO: this logic should mix myPartial with some default values
  return {
    attr1: {
      attr1: {
        attr1: null,
        attr2: 3,
        attr3: '',
      },
      attr2: 3,
      attr3: '',
    },
    attr2: 3,
    attr3: '',
  };
};

fn({});

fn({ attr12: { attr2: 5 } });

fn({ attr12: { attr12: null } });

fn({ attr12: { attr12: { attr32: '' } } });
