var caseCoverage = require('../src/index.js');
var builtCaseCoverage,
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
        testTypes = [
            'automated',
            'manual'
        ];
        builtCaseCoverage = caseCoverage.build(domains, testTypes, junitXMLFolderPath);
    });

    describe('build case coverage model', function() {

        it('should have an array of four objects, one for each domain', function () {
            expect(builtCaseCoverage.length).toEqual(domains.length);
        });

        describe('test type objects', function() {
            it('contains a total number', function() {
                expect(builtCaseCoverage[0]['discovering-content']['automated'].total).toEqual(23);
            });
        });

    });
});