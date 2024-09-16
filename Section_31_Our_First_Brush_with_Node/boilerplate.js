const fs = require('fs');

/*
// not synchronous version
fs.mkdir('dogs', { recursive: true }, (err) => {
  console.log('In the callback');
  if (err) throw err;
});
console.log('After mkdir');
*/

const folderName = process.argv[2] || 'Project';
try {
  fs.mkdirSync(folderName);

  fs.writeFileSync(`${folderName}/index.html`, '');
  fs.writeFileSync(`${folderName}/styles.css`, '');
  fs.writeFileSync(`${folderName}/app.js`, '');
} catch (e) {
  console.log('Something went wrong');
}
