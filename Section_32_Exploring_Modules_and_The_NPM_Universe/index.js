const franc = require('franc');
const langs = require('langs');
const colors = require('colors');

const input = process.argv[2];

const langCode = franc(input);
if (langCode === 'und') {
  console.log('Sorry, not enough text');
} else {
  const language = langs.where("3", langCode);
  console.log(`My best guess is ${language.name}`.green);
}

