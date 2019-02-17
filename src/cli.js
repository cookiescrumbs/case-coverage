#!/usr/bin/env node

var [ , , ... args ] = process.argv,
configPath       = args[0] || './spec/fixtures/case-coverage.json',
caseCoverage     = require('./index.js');

caseCoverage
    .run(configPath)
    .catch(console.log);