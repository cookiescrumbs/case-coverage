#!/usr/bin/env node
var caseCoverage = require('./index.js');
var configPath = './spec/fixtures/case-coverage.json';
caseCoverage.run(configPath)
.catch(function (error) {
    console.log(error);
});
