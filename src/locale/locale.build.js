const readDir = require('fs').readdirSync;
const files = readDir('./lang');
const entry = {};
files.forEach(file => {
    const name = file.split('.')[0];
    entry[name] = './lang/' + file;
});
module.exports = entry;