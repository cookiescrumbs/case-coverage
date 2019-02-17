/* This is a single e2e test that hits the cucumberJS layer and uses features located
on the file system at /specs/fixtures/features.*/

var caseCoverage = require('../src/index.js'),
configPath = './spec/fixtures/case-coverage.json',
caseCoverageFolder = './spec/fixtures/case-coverage-graph',
fs = require('fs'),
shell = require('shelljs'),
config;

function readGraphDataFile() {
    return new Promise(function (resolve) {
        fs.readFile(caseCoverageFolder + '/graph-data.js', 'utf8', function (error, data) {
            if (error) {
                reject(error);
            } else {
                eval(data);
                resolve(graphData);
            }
        });
    })
}

function cleanUpCaseCoverageFolder() { 
    shell.exec('rm -rf ' + caseCoverageFolder);
}

describe('caseCoverage', function () {

    afterEach(function (){
        cleanUpCaseCoverageFolder();
    });

    beforeEach(function(){
        cleanUpCaseCoverageFolder();
    });

    beforeEach(function(){
        config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    });

    describe('run', () => {
        it('should save a data file with the correct coverage data', function (done) {
            caseCoverage.run(configPath, caseCoverageFolder)
                .then(readGraphDataFile)
                .then(function (data) {
                    expect(data['datasets'].length).toEqual(config['domains'].length);
                    expect(data['datasets'][0].data).toEqual([{ x: 1, y: 3, r: 5 }]);
                    done();
                });

        });

        describe('Config path can\'t be found', () => {
            it('should give you Error message that the config can\'t be found', (done) => {
                caseCoverage.run('./there/is/no/config.json', caseCoverageFolder)
                .catch(function(error) {
                    expect(error.message).toEqual("ENOENT: no such file or directory, open './there/is/no/config.json'");
                    done();
                })
            });
        });

    });

});
