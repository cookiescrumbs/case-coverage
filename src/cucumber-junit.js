var shell = require('shelljs');
var domains,
    testTypes,
    junitXmlFolderPath,
    featuresFolder;


function cucumberDryRunJUnit(d) {
    // shell.exec("./node_modules/.bin/cucumber-js --tag");
    return 3;
    //"bundle exec cucumber --tag '#{t} and #{d}' --format junit --out #{output_path} --dry-run -p stage_env"
}

function buildCucumberCommand(d, junitFolder) {
    console.log("./node_modules/.bin/cucumber-js --tag " + "@" + d + "junit --out" + junitFolder + "--dry-run");

}

function run(doms, testT, folderPath, featuresF) {
    domains = doms;
    testTypes = testT;
    junitXmlFolderPath = folderPath;
    featuresFolder = featuresF;

    domains.map(function(d) {
        return cucumberDryRunJUnit(d);
    });
}

module.exports = {
    run: run
};