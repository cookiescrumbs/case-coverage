const shell = require('shelljs');
const fs = require('fs');
const graphModel = require('./graph-model.js');
const cucumberJSON = require('./cucumber-json.js');

function readConfigFile(configLoc) {
  return new Promise((resolve, reject) => {
    fs.readFile(configLoc, 'utf8', (error, data) => {
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
  return new Promise((resolve, reject) => {
    fs.writeFile(`${path}/graph-data.js`, `var graphData = ${JSON.stringify(model)}`, (error) => {
      if (error) {
        reject(error);
      } else {
        console.log('graph-data.js file saved');
        resolve();
      }
    });
  });
}

function folder(path) {
  return (path) || `case-coverage-graph#${Math.floor(Date.now() / 1000)}`;
}

function makeCoverageFolder(path) {
  fs.mkdirSync(path);
  console.log(`coverage folder created at ${path}`);
}

function indexLocation() {
  const sysNodeModFl = shell.exec('npm root -g').replace(/\n/g, '');
  const indexLoc = `${sysNodeModFl}/@cookiescrumbs/case-coverage/src/index.html`;
  if (fs.existsSync(indexLoc)) {
    return indexLoc;
  }
  return './node_modules/@cookiescrumbs/case-coverage/src/index.html';
}

function cpIndexHtmlFile(path) {
  return new Promise((resolve, reject) => {
    const indexLoc = indexLocation();
    const shellOut = shell.exec(`cp ${indexLoc} ${path}`);
    if (shellOut.stderr) {
      reject(shellOut.stderr);
    } else {
      console.log('html file ready!');
      resolve();
    }
  });
}

function run(configPath, caseCoverageFolderLocation = false) {
  const  path = folder(caseCoverageFolderLocation);
  return new Promise((resolve, reject) => {
    makeCoverageFolder(path);
    readConfigFile(configPath)
      .then(config => graphModel.build(config, cucumberJSON, shell))
      .then((model) => {
        saveGraphData(model, path)
          .catch((error) => {
            reject(error);
          });
      })
      .then(() => {
        cpIndexHtmlFile(path)
          .catch((error) => {
            reject(error);
          });
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  run,
};
