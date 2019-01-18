var shell,
config;

function cucumberJSON(d) {
    return new Promise(function(resolve, reject){
        var jsonCucumber;
        var shellOut = shell.exec(
            command(d),
            { silent: true, async: false }
        );
        if (shellOut.stderr) {
            reject(shellOut.stderr);
        }
        jsonCucumber = JSON.parse(shellOut.stdout);
        resolve(
            {
                [d]: {
                    testType: config.testType || 'all tests',
                    count: totalNumberofTests(jsonCucumber),
                    jsonCucumber: jsonCucumber
                }
            }
        );
    });
}

function totalNumberofTests(jsonCucumber) {
    return jsonCucumber.reduce(function (a, f) {
        return a + f.elements.length;
    }, 0);
}

function tags(d) {
    if (config.testType) {
       return  "@" + d + " and @" + config.testType;
    }
    return "@" + d + "";
}

function command(d) {
    // console.log("./node_modules/.bin/cucumber-js " + config.featuresFolder + " --tags  \"" + tags(d) + "\" --format=json");
    return "./node_modules/.bin/cucumber-js " + config.featuresFolder + " --tags  \"" + tags(d) + "\" --format=json";
}

function arrayOfCucumberJSONPromises(domains) {
    return domains.map(function (d) {
        return cucumberJSON(d);
    });
}

function fetch(conf, shellObj) {
    shell = shellObj;
    config = conf;
    return Promise.all(arrayOfCucumberJSONPromises(config.domains))
    .then(function(arrayOfCucumberJSON) {
        return arrayOfCucumberJSON;
    })
    .catch(function(error) {
       return error;
    });
}

module.exports = {
    fetch: fetch
}