#!/usr/bin/env node
var caseCoverage = require('./index.js');
var configLocation = './spec/fixtures/case-coverage.json';
caseCoverage.run(configLocation);
