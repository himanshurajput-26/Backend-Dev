// stringUtils.js
function capitalize(str) {
  return str.toUpperCase();
}

function reverse(str) {
  return str.split('').reverse().join('');
}

function countVowels(str) {
  return (str.match(/[aeiouAEIOU]/g) || []).length;
}

module.exports = { capitalize, reverse, countVowels };

// testStringUtils.js
const { capitalize, reverse, countVowels } = require('./stringUtils');

const text = "NodeJS is fun!";
console.log("Capitalized:", capitalize(text));
console.log("Reversed:", reverse(text));
console.log("Vowels count:", countVowels(text));
