// @ts-check

const { dscount, checkSyntax } = require('./main');

/**
 * @arg {[any, any][]} cases [arg or args, expected][]
 * @arg {function} fn
 * @return {void}
 */
const testEach = (cases, fn) => {
  cases.forEach(([args, expected]) => {
    const callMethod = Array.isArray(args) ? 'apply' : 'call';
    const actual = fn[callMethod](null, args);
    console.assert(actual === expected, `${args} -> ${actual}`);
  });
};

testEach(
  [
    [['ab___ab__', 'a', 'b'], 2],
    [['___cd____', 'c', 'd'], 1],
    [['de_______', 'd', 'e'], 1],
    [['12_12__12', '1', '2'], 3],
    [['_ba______', 'a', 'b'], 0],
    [['_a__b____', 'a', 'b'], 0],
    [['-ab-аb-ab', 'a', 'b'], 2],
    [['aAa', 'a', 'a'], 2],
  ],
  dscount
);

testEach(
  [
    ['---(++++)----', 0],
    ['', 0],
    ['before ( middle []) after ', 0],
    [') (', 1],
    ['} {', 1],
    ['<(   >)', 1],
    ['(  [  <>  ()  ]  <>  )', 0],
    ['   (      [)', 1],
  ],
  checkSyntax
);
