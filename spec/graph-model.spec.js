var graphModel = require('../src/graph-model.js'),
cucumberJSON = require('../src/cucumber-json.js'),
shell = require('shelljs');

describe('graphModel', function(){
    var config = {
            domains: [
                'discovering-content'
            ]
    };

    beforeEach(function(){
        var data = [
            [
                { 'discovering-content': { testType: 'manual', count: 3, jsonCucumber: [] } }
            ],
            [
                { 'discovering-content': { testType: 'wip', count: 1, jsonCucumber: [] } }
            ],
            [
                { 'discovering-content': { testType: 'all tests', count: 5, jsonCucumber: [] } }
            ]
        ];

        var fetchPromiseZero = new Promise(function (resolve, reject) {
            resolve(data[0]);
        });

        var fetchPromiseFirst = new Promise(function (resolve, reject) {
            resolve(data[1]);
        });

        var fetchPromiseSecond = new Promise(function (resolve, reject) {
            resolve(data[2]);
        });

        spyOn(cucumberJSON, 'fetch').and.returnValues(fetchPromiseZero, fetchPromiseFirst, fetchPromiseSecond);
    });

    it('should model the data returned from the cucumberJSON', function(done) {
        graphModel.build(config, cucumberJSON, shell)
        .then(function(model){
            expect(model.datasets[0].label).toEqual('discovering-content');
            expect(model.datasets[0].data[0]).toEqual({ x: 1, y: 3, r: 5 });
        });
        done();
    });

});