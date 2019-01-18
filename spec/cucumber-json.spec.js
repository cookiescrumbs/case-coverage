var cucumberJSON = require('../src/cucumber-json.js');
var shell = require('shelljs');

describe('cucumberJSON', function() {

    describe('fetch array of cucumber JSON', function() {
        /*
        These tests in this block are E2E test that hit the "fullstack" by running cucumberJS command using
        the Shell npm package. It is stubbed out using the feature files in the fixtures folder.
        */
        var config;

        beforeEach(function(){
            config = {
                domains: [
                    'discovering-content',
                    'live-lesson',
                    'creating-and-adapting-content'
                ],
                testType: 'manual',
                featuresFolder: './spec/fixtures/features'
            }
        });

        it('has an object per domain', function(done) {
            cucumberJSON.fetch(config, shell)
            .then(function(domainData) {
                expect(domainData.length).toEqual(config.domains.length);
                done();
            });
        });

        it('domain objects should look like this', function(done) {
            cucumberJSON.fetch(config, shell)
            .then(function(domainData) {
                var discoveringContent = domainData[0][config.domains[0]];
                expect(discoveringContent.testType).toEqual('manual');
                expect(discoveringContent.count).toEqual(3);
                expect(discoveringContent.jsonCucumber.length).toEqual(2);
                done();
            });
        });
    });

    describe('shell', function() {
        var config;

        beforeEach(function(){
            config = {
                domains: ['blah-blah'],
                testType: 'manual',
                featuresFolder: './spec/fixtures/features'
            };
        })

        it('should call the exec method on shell with the correct cucumberjs command', function (done) {
            var shellOut = {
                stdout: JSON.stringify([{ jsonCucumber: 'feature: blah', elements: [[{}], [{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]]}])
            };
            spyOn(shell, 'exec').and.returnValue(shellOut);
            var command = './node_modules/.bin/cucumber-js ./spec/fixtures/features --tags  "@blah-blah and @manual" --format=json';
            cucumberJSON.fetch(config, shell)
            .then(function (domainData) {
                expect(shell.exec).toHaveBeenCalledWith(command, { silent: true, async: false });
                expect(domainData).toEqual([
                    {
                        'blah-blah': {
                            testType: 'manual',
                            count: 5,
                            jsonCucumber: [{ jsonCucumber: 'feature: blah', elements: [[{}], [{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]] }],
                        }
                    }
                ]);
                done();
            });
        });

        it('should call shell exec with cucumberJS command containing just the domain tag when the testType is not present', function (done) {
            var shellOut = {
                stdout: JSON.stringify([{ jsonCucumber: 'feature: blah', elements: [[{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]] }])
            };
            delete config.testType;
            spyOn(shell, 'exec').and.returnValue(shellOut);
            var command = './node_modules/.bin/cucumber-js ./spec/fixtures/features --tags  "@blah-blah" --format=json';
            cucumberJSON.fetch(config, shell)
            .then(function (domainData) {
                expect(shell.exec).toHaveBeenCalledWith(command, { silent: true, async: false });
                expect(domainData).toEqual([
                    {
                        'blah-blah': {
                            testType: 'all tests',
                            count: 4,
                            jsonCucumber: [{ jsonCucumber: 'feature: blah', elements: [[{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]] }]
                        }
                    }
                ]);
                done();
            });
        });

        it('should fail with an error if there is a problem when calling the exec command', (done) => {
            var shellOut = {
                stderr: 'Error: something went wrong....'
            };
            spyOn(shell, 'exec').and.returnValue(shellOut);
            cucumberJSON.fetch(config, shell)
            .then(function (domainData) {
                expect(domainData).toEqual('Error: something went wrong....');
                done();
            });
        });
    });

});
