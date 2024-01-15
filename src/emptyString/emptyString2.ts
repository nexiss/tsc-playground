type Character = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i'; // Add the rest of possible characters
type NonEmptyString2 = `${Character}${string}`;

const myMethod2 = (param: NonEmptyString2): param is NonEmptyString2 =>
  param !== ''; // Here ts can infer that param can never be ''

// ------------------------------------------------------
const emptyString_1 = ''; // emptyString is '', not string
const x_ = myMethod2(emptyString_1);
if (x_) {
  console.log(emptyString_1);
} else {
  console.log(emptyString_1);
}

// ------------------------------------------------------
const emptyString_2: string = ''; // As emptyString2 can be any kind of string, we cannot detect cases where its value is ''
const xx_ = myMethod2(emptyString_2);
if (xx_) {
  console.log(emptyString_2);
} else {
  console.log(emptyString_2);
}
// Unless we explicitely do the check, then ts can infer it
if (emptyString_2 === '') {
  myMethod2(emptyString_2);
} else {
  myMethod2(emptyString_2);
}

// ------------------------------------------------------
const nonEmptyString_1: NonEmptyString2 = ''; // Ts is not helping when assigning empty strings to variables that should not be empty
const xxx_ = myMethod2(nonEmptyString_1);
if (xxx_) {
  console.log(nonEmptyString_1);
} else {
  console.log(nonEmptyString_1);
}

// ------------------------------------------------------
const nonEmptyString_2: NonEmptyString2 = 'anyString'; // Behaves the same as previous example
const xxxx_ = myMethod2(nonEmptyString_2);
if (xxxx_) {
  console.log(nonEmptyString_2);
} else {
  console.log(nonEmptyString_2);
}
