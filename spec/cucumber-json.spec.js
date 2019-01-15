var cucumberJSON = require('../src/cucumber-json.js');
var shell = require('shelljs');

describe('cucumberJSON', function() {

    describe('fetch array of cucumber JSON', function() {
        /*
        This is an E2E test that hits the "fullstack" by running cucumberJS command using
        the Shell npm package. It's stubbed out using the features files in the fixtures folder.
        */
        it('has an array per domain', function() {

            var config = {
                domains: [
                    'discovering-content',
                    'live-lesson',
                    'creating-and-adapting-content'
                ],
                testType: 'manual',
                featuresFolder: './spec/fixtures/features'
             }
            cucumberJSON.fetch(config, shell)
            .then(function(jsonArray) {
                expect(jsonArray.length).toEqual(config.domains.length);
            });
        });

        describe('shell', () => {
            var config = {
                domains: ['blah-blah'],
                testType: 'manual',
                featuresFolder: './spec/fixtures/features'
            };
            it('should call the exec method on shell with the correct cucumberjs command', function (done) {
                var shellOut = {
                    stdout: JSON.stringify([{ jsonCucumber: 'feature: blah' }, { jsomCucumber: 'feature: blah' }])
                };
                spyOn(shell, 'exec').and.returnValue(shellOut);
                var command = './node_modules/.bin/cucumber-js ./spec/fixtures/features --tags  "@blah-blah and @manual" --format=json';
                cucumberJSON.fetch(config, shell)
                .then(function (jsonArray) {
                    expect(shell.exec).toHaveBeenCalledWith(command, { silent: true, async: false });
                    expect(jsonArray).toEqual([
                        {
                            domain: 'blah-blah',
                            testType: 'manual',
                            count: 2,
                            jsonCucumber: [{ jsonCucumber: 'feature: blah' }, { jsomCucumber: 'feature: blah' }],
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
                .then(function (jsonArray) {
                    expect(jsonArray).toEqual('Error: something went wrong....');
                    done();
                });
            });
        });



    });


});
