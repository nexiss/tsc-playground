// Our Custom object type, whatever it is
type Custom = {
  attr: any;
};

// Base attributes of our type
type BaseSeries = {
  baseAttr: any;
};

// This is the key of the whole example
// Type potentially containing a custom type
type Series<T = undefined> = T extends undefined
  ? BaseSeries
  : BaseSeries & {
      custom: T;
    };

// As T is not provided, custom does not exist on param
const foo = (param: Series) => {
  console.log(param.custom);
};

// Because T is provided, we can access custom attribute without using '?' operator
const foo2 = (param: Series<Custom>) => {
  console.log(param.custom);
};

// When T is not provided, then custom will not be part of the type
const nonCustomSeries1: Series = {
  baseAttr: '',
};

const nonCustomSeries2: Series = {
  baseAttr: '',
  custom: {
    attr: '',
  },
};

// But if T is provided, then it becomes a mandatory attribute that needs to be informed
const customSeries1: Series<Custom> = {
  baseAttr: '',
};
const customSeries2: Series<Custom> = {
  baseAttr: '',
  custom: {
    attr: '',
  },
};

// Because T is undefined it's the same case as nonCustomSeries
const undefinedCustomSeries1: Series<undefined> = {
  baseAttr: '',
};

// Because T is undefined, it also gives an error if we set the custom attribute
const undefinedCustomSeries2: Series<undefined> = {
  baseAttr: '',
  custom: {
    attr: '',
  },
};

foo(nonCustomSeries1);
foo(nonCustomSeries2);
foo(customSeries1);
foo(customSeries2);
foo(undefinedCustomSeries1);
foo(undefinedCustomSeries2);
foo2(nonCustomSeries1); // error, because nonCustomSeries1 does not contain 'custom' attribute, as T was not provided
foo2(nonCustomSeries2); // error, because nonCustomSeries2 does not contain 'custom' attribute, as T was not provided
foo2(customSeries1);
foo2(customSeries2);
foo2(undefinedCustomSeries1); // same case
foo2(undefinedCustomSeries2); // same case
