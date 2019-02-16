var graphModel = require('../src/graph-model.js'),
cucumberJSON = require('../src/cucumber-json.js');

describe('graphModel', function(){
    var config = {
            domains: [
                'discovering-content'
            ]
    };

    describe('fetch', () => {
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
    
            var fetchPromiseZero = new Promise(function (resolve) {
                resolve(data[0]);
            });
    
            var fetchPromiseFirst = new Promise(function (resolve) {
                resolve(data[1]);
            });
    
            var fetchPromiseSecond = new Promise(function (resolve) {
                resolve(data[2]);
            });
    
            spyOn(cucumberJSON, 'fetch').and.returnValues(fetchPromiseZero, fetchPromiseFirst, fetchPromiseSecond);
        });
    
        it('should model the data returned from the cucumberJSON', function(done) {
            graphModel.build(config, cucumberJSON)
            .then(function(model){
                expect(model.datasets[0].label).toEqual('discovering-content');
                expect(model.datasets[0].data[0]).toEqual({ x: 1, y: 3, r: 5 });
            });
            done();
        });
    });
   

    describe('number of automated tests', function() {

        beforeEach(function(){
            var data = [
                [
                    { 'discovering-content': { testType: 'manual', count: 15, jsonCucumber: [] } }
                ],
                [
                    { 'discovering-content': { testType: 'wip', count: 15, jsonCucumber: [] } }
                ],
                [
                    { 'discovering-content': { testType: 'all tests', count: 10, jsonCucumber: [] } }
                ]
            ];
    
            var fetchPromiseZero = new Promise(function (resolve) {
                resolve(data[0]);
            });
    
            var fetchPromiseFirst = new Promise(function (resolve) {
                resolve(data[1]);
            });
    
            var fetchPromiseSecond = new Promise(function (resolve) {
                resolve(data[2]);
            });
    
            spyOn(cucumberJSON, 'fetch').and.returnValues(fetchPromiseZero, fetchPromiseFirst, fetchPromiseSecond);
        });

        it('should deal with a negative number of results by returning zero', function(done) {
            graphModel.build(config, cucumberJSON)
            .then(function(model){
                expect(model.datasets[0].data[0]).toEqual({ x: 0, y: 15, r: 10 });
            });
            done();
        });
    });

   
});