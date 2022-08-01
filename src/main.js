// @ts-check

// Task #1

/**
 * Counts the number of consecutive characters in a string, O(n)
 * @arg {string} string
 * @arg {string} char1
 * @arg {string} char2
 * @return {number}
 */
const dscount = (string, char1, char2) =>
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

[
  [['ab___ab__', 'a', 'b'], 2],
  [['___cd____', 'c', 'd'], 1],
  [['de_______', 'd', 'e'], 1],
  [['12_12__12', '1', '2'], 3],
  [['_ba______', 'a', 'b'], 0],
  [['_a__b____', 'a', 'b'], 0],
  [['-ab-аb-ab', 'a', 'b'], 2],
  [['aAa', 'a', 'a'], 2],
].forEach(([args, expected]) => {
  const actual = dscount.apply(null, args);
  console.assert(actual === expected, `${args[0]} -> ${actual}`);
});
