const shell = require('shelljs');
const cucumberJSON = require('../src/cucumber-json.js');

describe('cucumberJSON', () => {
  describe('shell', () => {
    let config;

    beforeEach(() => {
      config = {
        domains: ['blah-blah'],
        testType: 'manual',
        featuresFolder: './spec/fixtures/features',
      };
    });

    it('should call the exec method on shell with the correct cucumberjs command', (done) => {
      const shellOut = {
        stdout: JSON.stringify([{ jsonCucumber: 'feature: blah', elements: [[{}], [{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]] }]),
      };
      spyOn(shell, 'exec').and.returnValue(shellOut);
      const command = './node_modules/.bin/cucumber-js ./spec/fixtures/features --tags  "@blah-blah and @manual" --format=json';
      cucumberJSON.fetch(config)
        .then((domainData) => {
          expect(shell.exec).toHaveBeenCalledWith(command, { silent: true, async: false });
          expect(domainData).toEqual([
            {
              'blah-blah': {
                testType: 'manual',
                count: 5,
                jsonCucumber: [{ jsonCucumber: 'feature: blah', elements: [[{}], [{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]] }],
              },
            },
          ]);
          done();
        });
    });

    it('should call shell exec with cucumberJS command containing just the domain tag when the testType is not present', (done) => {
      const shellOut = {
        stdout: JSON.stringify([{ jsonCucumber: 'feature: blah', elements: [[{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]] }]),
      };
      delete config.testType;
      spyOn(shell, 'exec').and.returnValue(shellOut);
      const command = './node_modules/.bin/cucumber-js ./spec/fixtures/features --tags  "@blah-blah" --format=json';
      cucumberJSON.fetch(config)
        .then((domainData) => {
          expect(shell.exec).toHaveBeenCalledWith(command, { silent: true, async: false });
          expect(domainData).toEqual([
            {
              'blah-blah': {
                testType: 'all tests',
                count: 4,
                jsonCucumber: [{ jsonCucumber: 'feature: blah', elements: [[{}]] }, { jsomCucumber: 'feature: blah', elements: [[{}], [{}], [{}]] }],
              },
            },
          ]);
          done();
        });
    });

    it('should fail with an error if there is a problem when calling the exec command', (done) => {
      const shellOut = {
        stderr: 'Error: something went wrong....',
      };
      spyOn(shell, 'exec').and.returnValue(shellOut);
      cucumberJSON.fetch(config)
        .then((domainData) => {
          expect(domainData).toEqual('Error: something went wrong....');
          done();
        });
    });
  });
});
