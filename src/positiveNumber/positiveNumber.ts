/**
 * This example was created by following the next articles:
 * - https://javascript.plainenglish.io/coding-adventure-positivenumber-in-typescript-8c642c17bc76
 * - https://dev.to/hateablestream/typescript-tip-safer-functions-with-branded-types-14o4
 */

const assertPositiveNumber = (x: number) => {
  assert(x > 0, `${x} is not positive`);
};

/** Case 1 (Not working) */

type PositiveNumber = number;

const positiveNumberSchema = (x: number): PositiveNumber => {
  assertPositiveNumber(x);
  return x;
};

const f = (x: PositiveNumber) => x + 1;

f(positiveNumberSchema(4.2));
f(positiveNumberSchema(-1)); // The assertion will be triggered in this case
f(-1); // Not working as expected, because PositiveNumber is still only extending 'number'

/**
 * Case 2 (Working)
 */
type PositiveNumber2 = number & { __brand: 'PositiveNumber2' };

const positiveNumberSchema2 = (x: number): PositiveNumber2 => {
  assertPositiveNumber(x);
  return x as PositiveNumber2; // Casting is needed now
};

const f2 = (x: PositiveNumber2) => x + 1;

f2(positiveNumberSchema2(4.2));
f2(positiveNumberSchema2(-1)); // The assertion will be triggered in this case

const positiveNumber = positiveNumberSchema2(-1);
if (positiveNumber === 0) {
}

f2(-1); // Now we can detect numbers that are not "PositiveNumbers2"
f2(-1 as PositiveNumber2); // CAUTION: we can still introduce errors by casting!!!!
f2(2); // '2' in terms of typing is just a number, no way to know if it's positive or not
