#!/usr/bin/env node
var caseCoverage = require('./index.js');
var [ , , ... args ] = process.argv;
var configPath = (args[0])? args[0] : './spec/fixtures/case-coverage.json';
caseCoverage.run(configPath)
.catch(function (error) {
    console.log(error);
});
