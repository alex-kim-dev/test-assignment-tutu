// @ts-check

// Fizz-buzz task #1

/**
 * Counts the number of consecutive characters in a string, O(n)
 * @arg {string} string
 * @arg {string} char1
 * @arg {string} char2
 * @return {number}
 */
exports.dscount = (string, char1, char2) =>
  string
    .toLowerCase()
    .split('')
    .reduce(
      ({ prevMatch, count }, char) => ({
        prevMatch: char === char1,
        count: count + Number(prevMatch && char === char2),
      }),
      { prevMatch: false, count: 0 }
    ).count;

// Fizz-buzz task #2

/**
 * Checks the sequence of brackets for syntactic correctness
 * @arg {string} string
 * @return {0 | 1} ok | error
 */
exports.checkSyntax = (string) => {
  const stack = [];
  const openings = '<[{(';
  const closings = '>]})';

  const types = {
    '<': 'angle',
    '>': 'angle',
    '[': 'square',
    ']': 'square',
    '{': 'curly',
    '}': 'curly',
    '(': 'round',
    ')': 'round',
  };

  for (const char of string) {
    if (openings.includes(char)) stack.push(types[char]);

    if (closings.includes(char)) {
      const last = stack.pop();
      if (last !== types[char]) return 1;
    }
  }

  return 0;
};

// Algorithms task

/**
 * @arg {number} pancakes, number of pancakes to cook
 * @arg {number} pans, number of pans
 * @return {number} minutes spend on cooking
 */
exports.estimateCookingTime = (pancakes, pans = 2) => {
  if (
    !Number.isFinite(pancakes) ||
    !Number.isFinite(pans) ||
    pancakes < 0 ||
    pans < 1
  )
    return -1;
  const pancakeSides = 2;
  return Math.ceil(pancakes / pans) * pancakeSides;
};
