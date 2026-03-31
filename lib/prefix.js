const fs = require('fs');
const path = require('path');

const PREFIX_FILE = path.join(__dirname, '../data/prefix.json');

function getPrefix() {
    try {
        const data = JSON.parse(fs.readFileSync(PREFIX_FILE, 'utf8'));
        return data.prefix || '.';
    } catch (e) {
        return '.';
    }
}

function setPrefix(newPrefix) {
    fs.writeFileSync(PREFIX_FILE, JSON.stringify({ prefix: newPrefix }, null, 2));
}

module.exports = { getPrefix, setPrefix };
