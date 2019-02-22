#!/usr/bin/env node

const caseCoverage = require('./index.js');

const [, , ...args] = process.argv;
const configPath = args[0] || './spec/fixtures/case-coverage.json';
const Console = console;

caseCoverage
  .run(configPath)
  .catch((error) => {
    Console.error(error);
  });
