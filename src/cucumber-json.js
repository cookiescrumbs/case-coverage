var shell = require('shelljs'),
    config;

function fetch(conf) {
    config = conf;
    return Promise.all(arrayOfCucumberJSONPromises(config.domains))
        .then(function(arrayOfCucumberJSON) {
            return arrayOfCucumberJSON;
        })
        .catch(function(error) {
            return error;
        });
}

function arrayOfCucumberJSONPromises(domains) {
    return domains.map(function (domain) {
        return cucumberJSON(domain);
    });
}

function cucumberJSON(d) {
    return new Promise(function(resolve, reject) {
        var jsonCucumber;
        var shellOut = shell.exec(command(d), { silent: true, async: false });
        if (shellOut.stderr) {
            reject(shellOut.stderr);
        }
        jsonCucumber = JSON.parse(shellOut.stdout);
        resolve(
            {
                [d]: {
                    testType:     config.testType || 'all tests',
                    count:        totalNumberofTests(jsonCucumber),
                    jsonCucumber: jsonCucumber
                }
            }
        );
    });
}

function command(domain) {
    var tags = "@" + domain;

    if (config.testType) {
        tags += " and @" + config.testType;
    }

    var result = "./node_modules/.bin/cucumber-js "
        + config.featuresFolder
        + " --tags \"" + tags + "\""
        + " --format=json"

    console.log(result);

    return result;
}

function totalNumberofTests(jsonCucumber) {
    return jsonCucumber.reduce(function (a, f) {
        return a + f.elements.length;
    }, 0);
}

module.exports = {
    fetch: fetch
}