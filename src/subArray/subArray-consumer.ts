type Subarray<T extends readonly any[]> = T[number][];

const arr = ['a', 'b', 'c'] as const;

const s1: Subarray<typeof arr> = [];
const s2: Subarray<typeof arr> = ['a'];
const s8: Subarray<['a', 'b', 'c']> = ['a'];
const s3: Subarray<typeof arr> = ['b'];
const s4: Subarray<typeof arr> = ['a', 'b'];
const s5: Subarray<typeof arr> = ['c', 'a'];
const s6: Subarray<typeof arr> = ['c', 'a'];
const s7: Subarray<typeof arr> = ['something not included in arr'];
const s9: Subarray<['a', 'b', 'c']> = ['something not included in arr'];
