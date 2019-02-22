/* This is a single e2e test that hits the cucumberJS layer and uses features located
on the file system at /specs/fixtures/features.
*/

const shell = require('shelljs');
const fs = require('fs');
const caseCoverage = require('../src/index.js');

const configPath = './spec/fixtures/case-coverage.json';
const caseCoverageFolder = './spec/fixtures/case-coverage-graph';
let config;

function readGraphDataFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(`${caseCoverageFolder}/graph-data.js`, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        /* graphData is available in data and is added to the scope by using eval */
        /* eslint-disable */
        eval(data);
        resolve(graphData);
        /* eslint-enable */
      }
    });
  });
}

function cleanUpCaseCoverageFolder() {
  shell.exec(`rm -rf ${caseCoverageFolder}`);
}

describe('caseCoverage', () => {
  afterEach(() => {
    cleanUpCaseCoverageFolder();
  });

  beforeEach(() => {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  });

  describe('run', () => {
    it('should save a data file with the correct coverage data', (done) => {
      caseCoverage.run(configPath, caseCoverageFolder)
        .then(readGraphDataFile)
        .then((data) => {
          expect(data.datasets.length).toEqual(config.domains.length);
          expect(data.datasets[0].data).toEqual([{ x: 1, y: 3, r: 5 }]);
          done();
        });
    });

    describe('Config path can\'t be found', () => {
      it('should give you Error message that the config can\'t be found', (done) => {
        caseCoverage.run('./there/is/no/config.json', caseCoverageFolder)
          .catch((error) => {
            expect(error.message).toEqual("ENOENT: no such file or directory, open './there/is/no/config.json'");
            done();
          });
      });
    });
  });
});
