var shell,
config;


// function domain(d){
//     return {
//         label: d,
//         data: [ data(d) ]
//     };
// }

// function data(d) {
//     return {
//         x: automated(d),
//         y: manual(d),
//         r: 3
//     }
// }

// function manual(d) {
//     var tags = "@" + d + " and @manual";
//     var json = JSON.parse(shell.exec("./node_modules/.bin/cucumber-js spec/fixtures/features --tags  \"" + tags + "\" --format=json", { silent: true }));
//     return numberOfScenarios(json);
// }

// function numberOfScenarios(json) {
//     var numberOfElements = json.map(function (feature) {
//         return feature.elements.length;
//     }).reduce(function (a, b) { return a + b; }, 0);
//     return numberOfElements
// }

function cucumberJSON(d) {
    return new Promise(function(resolve, reject){
        var shellOut = shell.exec(
            command(d),
            { silent: true, async: false }
        );
        if (shellOut.stderr) {
            reject(shellOut.stderr);
        }
        resolve(JSON.parse(shellOut.stdout));
    });
}

function tags(d) {
    return "@" + d + " and @" + config.testType;
}

function command(d) {
    console.log("./node_modules/.bin/cucumber-js " + config.featuresFolder + " --tags  \"" + tags(d) + "\" --format=json");
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