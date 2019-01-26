/*
These tests are E2E test that hit the "fullstack" by running cucumberJS command using
the Shell npm package. They are stubbed out using the feature files in the fixtures folder.
*/

describe('fetch array of cucumber JSON', function () {
    var config;

    beforeEach(function () {
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

    // it('has an object per domain', function(done) {
    //     cucumberJSON.fetch(config, shell)
    //     .then(function(domainData) {
    //         expect(domainData.length).toEqual(config.domains.length);
    //         done();
    //     });
    // });

    // it('domain objects should look like this', function(done) {
    //     cucumberJSON.fetch(config, shell)
    //     .then(function(domainData) {
    //         var discoveringContent = domainData[0][config.domains[0]];
    //         expect(discoveringContent.testType).toEqual('manual');
    //         expect(discoveringContent.count).toEqual(3);
    //         expect(discoveringContent.jsonCucumber.length).toEqual(2);
    //         done();
    //     });
    // });
});