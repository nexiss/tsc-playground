// Whatever string type we may want to define but empty one
type MyStringType = `${string}`;

type NonEmptyString<T extends string> = T extends '' ? never : T;

const myMethod = <T extends string>(
  param: NonEmptyString<T>
): param is NonEmptyString<T> => param !== '';

// ------------------------------------------------------
const emptyString = ''; // emptyString is '', not string
const x = myMethod(emptyString);
if (x) {
  console.log(emptyString);
} else {
  console.log(emptyString);
}

// ------------------------------------------------------
const emptyString2: string = ''; // As emptyString2 can be any kind of string, we cannot detect cases where its value is ''
const xx = myMethod(emptyString2);
if (xx) {
  console.log(emptyString2);
} else {
  console.log(emptyString2);
}
// Unless we explicitely do the check, then ts can infer it
if (emptyString2 === '') {
  myMethod(emptyString2);
} else {
  myMethod(emptyString2);
}

// ------------------------------------------------------
const nonEmptyString1: NonEmptyString<MyStringType> = ''; // Ts is not helping when assigning empty strings to variables that should not be empty
const xxx = myMethod(nonEmptyString1);
if (xxx) {
  console.log(nonEmptyString1);
} else {
  console.log(nonEmptyString1);
}

// ------------------------------------------------------
const nonEmptyString2: NonEmptyString<MyStringType> = 'anyString'; // Behaves the same as previous example
const xxxx = myMethod(nonEmptyString2);
if (xxxx) {
  console.log(nonEmptyString2);
} else {
  console.log(nonEmptyString2);
}

const nonEmptyString3: NonEmptyString<MyStringType | ''> | '' = ''; // Still, nothing here that could help us, as nonEmptyString3 will still be any string
const xxxxx = myMethod(nonEmptyString3);
if (xxxxx) {
  console.log(nonEmptyString3);
} else {
  console.log(nonEmptyString3);
}
