const shell = require('shelljs');

const Console = console;
let config;

function tags(d) {
  if (config.testType) {
    return `@${d} and @${config.testType}`;
  }
  return `@${d}`;
}

function command(d) {
  Console.log(`./node_modules/.bin/cucumber-js ${config.featuresFolder} --tags  "${tags(d)}" --format=json`);
  return `./node_modules/.bin/cucumber-js ${config.featuresFolder} --tags  "${tags(d)}" --format=json`;
}

function totalNumberofTests(jsonCucumber) {
  return jsonCucumber.reduce((a, f) => a + f.elements.length, 0);
}

function cucumberJSON(domain) {
  return new Promise((resolve, reject) => {
    const shellOut = shell.exec(
      command(domain),
      { silent: true, async: false },
    );
    if (shellOut.stderr) {
      reject(shellOut.stderr);
    }
    const jsonCucumber = JSON.parse(shellOut.stdout);
    resolve(
      {
        [domain]: {
          testType: config.testType || 'all tests',
          count: totalNumberofTests(jsonCucumber),
          jsonCucumber,
        },
      },
    );
  });
}

function arrayOfCucumberJSONPromises(domains) {
  return domains.map(d => cucumberJSON(d));
}

function fetch(conf) {
  config = conf;
  return Promise.all(arrayOfCucumberJSONPromises(config.domains))
    .then(arrayOfCucumberJSON => arrayOfCucumberJSON)
    .catch(error => error);
}

module.exports = {
  fetch,
};
