var cucumberJSON = require('../src/cucumber-json.js');
var shell = require('shelljs');


function build(config) {
    ['manual', 'wip', ''].map(function(t) {
        config.testType = t;
        return cucumberJSON.fetch(config, shell)
        .then(function(jsonArray) {
            return jsonArray;
        });
    });

}






module.exports = {
    build: build
}