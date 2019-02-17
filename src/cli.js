#!/usr/bin/env node

var [ , , ... args ] = process.argv;
var configPath       = args[0] || './spec/fixtures/case-coverage.json';
var caseCoverage     = require('./index.js');

caseCoverage
    .run(configPath)
    .catch(console.log);
