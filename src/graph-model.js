var cucumberJSON = require('./cucumber-json.js'),
shell = require('shelljs');

function model(data) {
    return data.reduce(function(a,d){
        var domain = Object.keys(d)[0];
        if(!(domain in a)) {
            if (d[domain]['testType'] == 'manual') {
                a[domain] = {};
                a[domain]['manual']=  d[domain]['count'];
            } else if (d[domain]['testType'] == 'wip' ) {
                a[domain] = {};
                a[domain]['wip'] = d[domain]['count'];
            } else if (d[domain]['testType'] == 'all test') {
                a[domain] = {};
                a[domain]['total'] = d[domain]['count'];
            }
        } else {
            if (d[domain]['testType'] == 'manual') {
                a[domain]['manual'] = d[domain]['count'];
            } else if (d[domain]['testType'] == 'wip') {
                a[domain]['wip'] = d[domain]['count'];
            } else if (d[domain]['testType'] == 'all tests') {
                a[domain]['total'] = d[domain]['count'];
            }
        }
        return a;
    }, {});
}


function coverageData(config) {
    return ['manual', 'wip', false].map(function (t) {
        config.testType = t;
        return cucumberJSON.fetch(config, shell)
            .then(function (domainData) {
                return domainData;
            });
    });
}

function flatten(array) {
    return [].concat.apply([], array);
}

function build(config) {
    return Promise.all(coverageData(config))
    .then(function(data){
        return model(flatten(data));
    });
}

module.exports = {
    build: build
}