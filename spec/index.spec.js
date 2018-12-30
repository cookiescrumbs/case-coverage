var CaseCoverage = require('../src/index.js').caseCoverage;
var caseCoverage,
domains,
testTypes,
junitXMLFolderPath;

describe('CaseCoverage', function() {
    beforeEach(function(){
        domains = [
            'discovering-content',
            'creating-and-adapting-content',
            'live-lesson'
        ];
        junitXMLFolderPath = './junitXML';
        var testTypes = [
            'automated',
            'manual'
        ];
        caseCoverage = new CaseCoverage(domains, testTypes, junitXMLFolderPath);

    });
    describe('build case coverage model', function() {

        it('should have an array of four objects, one for each domain', function () {
            expect(caseCoverage.build().length).toEqual(domains.length);
        });

        describe('test type objects', function() {
            it('contains a total number', function() {
                expect(caseCoverage.build()[0]['discovering-content']['automated'].total).toEqual(23);
            });
        });

    });
});