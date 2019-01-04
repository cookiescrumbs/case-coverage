var cucumberJUnit = require('../src/cucumber-junit.js');
var domains;

describe('cucumberJunit', function(){

    beforeEach(function(){
        domains = [
            'discovering-content',
            'creating-and-adapting-content',
            'live-lesson'
        ];
    });

    it('should create a folder of test JUnit xml, one for each domain', function(){
        expect(cucumberJUnit.run(domains)).toEqual(domains.length)
    });

});