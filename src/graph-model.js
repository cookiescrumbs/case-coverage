var randomColorRGB = require('random-color-rgb'),
shell = require('shelljs'),
cucumberJSON;

function transform(data) {
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

function model(data) {
    var domains = Object.keys(data);
    var sets = {};
    sets['datasets'] = domains.map(function(d){
        return {
            label: d,
            data: [
                {
                    x: automated(data[d]),
                    y: data[d].manual,
                    r: data[d].total
                }
            ],
            fillColor: "rgba(0,0,0,0)",
            backgroundColor: randomColorRGB({ opacity: 0.6 })
        }
    });
    return sets;
}

function automated(data) {
    var num  = (data.total - (data.manual + data.wip));
    return (num < 0)? 0 : num;
}


function build(config, cj) {
    cucumberJSON = cj;
    return Promise.all(coverageData(config))
    .then(function(data){
        return model(transform(flatten(data)));
    });
}

module.exports = {
    build: build
}