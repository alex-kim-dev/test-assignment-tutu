// @ts-check

const { dscount, checkSyntax } = require('./main');

/**
 * @arg {string} testName
 * @arg {string[]} errors
 * @return {void}
 */
const log = (testName, errors) => {
  if (errors.length === 0) {
    console.log(`✅ ${testName}`);
    return;
  }

  errors.forEach((error) => console.log(`❌ ${testName}: ${error}`));
};

/**
 * @arg {[any, any][]} cases, a tuple of arg / array of args and expected values
 * @return {(name: string, fn: Function) => void}
 */
const testEach = (cases) => (testName, fn) => {
  const errors = cases.reduce((acc, [args, expected]) => {
    const callMethod = Array.isArray(args) ? 'apply' : 'call';
    const actual = fn[callMethod](null, args);
    return actual === expected
      ? acc
      : [...acc, `${args} => ${actual}`];
  }, new Array());

  log(testName, errors);
};

testEach([
  [['ab___ab__', 'a', 'b'], 2],
  [['___cd____', 'c', 'd'], 1],
  [['de_______', 'd', 'e'], 1],
  [['12_12__12', '1', '2'], 3],
  [['_ba______', 'a', 'b'], 0],
  [['_a__b____', 'a', 'b'], 0],
  [['-ab-аb-ab', 'a', 'b'], 2],
  [['aAa', 'a', 'a'], 2],
])('consecutive chars', dscount);

testEach([
  ['---(++++)----', 0],
  ['', 0],
  ['before ( middle []) after ', 0],
  [') (', 1],
  ['} {', 1],
  ['<(   >)', 1],
  ['(  [  <>  ()  ]  <>  )', 0],
  ['   (      [)', 1],
])('bracket balancer', checkSyntax);
