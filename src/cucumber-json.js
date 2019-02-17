var shell   = require('shelljs'),
    compose = require('./compose');

function fetch(config) {
    return Promise
        .all(promises(config))
        .then(function(arrayOfCucumberJSON) {
            return arrayOfCucumberJSON;
        })
        .catch(function(error) {
            return error;
        });
}

function promises(config) {
    return config.domains.map(function (domain) {
        return new Promise(function (resolve, reject) {
            var process, features;

            process = exec(domain, config);
            if (process.stderr) {
                reject(process.stderr);
                return;
            }

            features = JSON.parse(process.stdout);
            resolve({
                [domain] : {
                    testType:     config.testType || 'all tests',
                    count:        count(features),
                    jsonCucumber: features
                }
            });
        });
    });    
}

function count(features) {
    return features.reduce(function (total, feature) {
        return total + feature.elements.length;
    }, 0);
}

function exec(domain, config) {
    var command, tags;

    tags = "@" + domain;

    if (config.testType) {
        tags += " and @" + config.testType;
    }

    command = "./node_modules/.bin/cucumber-js "
        + config.featuresFolder
        + " --tags \"" + tags + "\""
        + " --format=json";

    return shell.exec(command, { silent: true, async: false });
}

module.exports = {
    fetch: fetch
}