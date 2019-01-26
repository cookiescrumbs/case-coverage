var graphModel = require('./graph-model.js'),
    cucumberJSON = require('./cucumber-json.js'),
    shell = require('shelljs'),
    fs = require('fs'),
    path = folder();

function readConfigFile(configLoc) {
    return new Promise(function (resolve, reject) {
        fs.readFile(configLoc, 'utf8', function (error, data) {
            if (error) {
                reject(error);
            } else {
                console.log('config file read');
                resolve(JSON.parse(data));
            }
        });
    });
}

function saveGraphData(model, path) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path + "/graph-data.js", "var graphData = " + JSON.stringify(model), function (error) {
            if (error) {
                reject(error);
            } else {
                console.log('graph-data.js file saved');
                resolve();
            }
        });
    });
}

function folder() {
    return '../case-coverage-graph#' + (Math.floor(Date.now() / 1000));
}

function makeCoverageFolder(path) {
    fs.mkdirSync(path);
    console.log('coverage folder created at ' + path);
}

function cpIndexHtmlFile(path) {
    return new Promise(function (resolve, reject) {
        var shellOut = shell.exec('cp src/index.html ' + path);
        if (shellOut.stderr) {
            reject(shellOut.stderr);
        } else {
            console.log('html file ready!');
            resolve();
        }
    });
}

function run(configLoc) {
    makeCoverageFolder(path);
    readConfigFile(configLoc)
        .then(function (config) {
            return graphModel.build(config, cucumberJSON, shell);
        })
        .then(function (model) {
            saveGraphData(model, path);
        })
        .then(function () {
            cpIndexHtmlFile(path);
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports = {
    run: run
}