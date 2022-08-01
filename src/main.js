// @ts-check

// Task #1

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

// Task #2

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
