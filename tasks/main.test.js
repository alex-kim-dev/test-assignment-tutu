// @ts-check

const {
  dscount,
  checkSyntax,
  estimateCookingTime,
  lastIndex,
  drawRating,
  parseUrl,
} = require('./main');

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
    return actual === expected ? acc : [...acc, `${args} => ${actual}`];
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
  ['((<>)', 1],
])('bracket balancer', checkSyntax);

testEach([
  [-1, -1],
  [0, 0],
  [3, 4],
  [4, 4],
  [2, 2],
  [1, 2],
  [[3, 0], -1],
  [[3, 3], 2],
  [[1, 3], 2],
  [[4, 3], 4],
])('pancakes cooking', estimateCookingTime);

testEach([
  [['', 'a', 'b'], -1],
  [['abc', '', ''], -1],
  [['abc', 'a', ''], 0],
  [['abc', '', 'b'], 1],
  [['abc', 'a', 'b'], 1],
  [['abc', 'a', 'c'], 2],
  [['abc', 'c', 'b'], 2],
  [['abc', 'y', 'z'], -1],
  [['abc', 'c', 'c'], 2],
  [['abcca', 'a', 'c'], 4],
  [['abcca', 'a'], 4],
  [['abcca', 'c', 'b', 'a'], 4],
])('last index', lastIndex);

testEach([
  [0, '★☆☆☆☆'],
  [1, '★☆☆☆☆'],
  [20, '★☆☆☆☆'],
  [21, '★★☆☆☆'],
  [40, '★★☆☆☆'],
  [41, '★★★☆☆'],
  [60, '★★★☆☆'],
  [61, '★★★★☆'],
  [80, '★★★★☆'],
  [81, '★★★★★'],
  [100, '★★★★★'],
])('stars rating', drawRating);

{
  const url = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');
  const errors = [
    ['href', 'http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo'],
    ['hash', '#foo'],
    ['port', '8080'],
    ['host', 'tutu.ru:8080'],
    ['protocol', 'http:'],
    ['hostname', 'tutu.ru'],
    ['pathname', '/do/any.php'],
    ['origin', 'http://tutu.ru:8080'],
  ].reduce(
    (acc, [prop, expected]) =>
      url[prop] === expected ? acc : [...acc, `${prop} => ${url[prop]}`],
    new Array()
  );

  log('url parsing', errors);
}
