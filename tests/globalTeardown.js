// Jest globalTeardown: clean up testGlobals.json after all tests
const fs = require('fs');
module.exports = async () => {
  if (fs.existsSync('./tests/testGlobals.json')) {
    fs.unlinkSync('./tests/testGlobals.json');
  }
};
