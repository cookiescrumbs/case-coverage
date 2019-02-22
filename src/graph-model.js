const randomColorRGB = require('random-color-rgb');

function transform(data) {
  return data.reduce((a, d) => {
    const domain = Object.keys(d)[0];
    if (!(domain in a)) {
      if (d[domain].testType === 'manual') {
        a[domain] = {};
        a[domain].manual = d[domain].count;
      } else if (d[domain].testType === 'wip') {
        a[domain] = {};
        a[domain].wip = d[domain].count;
      } else if (d[domain].testType === 'all test') {
        a[domain] = {};
        a[domain].total = d[domain].count;
      }
    } else if (d[domain].testType === 'manual') {
      a[domain].manual = d[domain].count;
    } else if (d[domain].testType === 'wip') {
      a[domain].wip = d[domain].count;
    } else if (d[domain].testType === 'all tests') {
      a[domain].total = d[domain].count;
    }
    return a;
  }, {});
}

function copyConfig(config) {
  return Object.assign({}, config);
}

function coverageData(config, cucumberJSON) {
  return ['manual', 'wip', false].map((t) => {
    const copyOfConfig = copyConfig(config);
    copyOfConfig.testType = t;
    return cucumberJSON.fetch(copyOfConfig)
      .then(domainData => domainData);
  });
}

function automated(data) {
  const num = (data.total - (data.manual + data.wip));
  return (num < 0) ? 0 : num;
}

function flatten(array) {
  return [].concat(...array);
}

function model(data) {
  const domains = Object.keys(data);
  const sets = {};
  sets.datasets = domains.map(d => ({
    label: d,
    data: [
      {
        x: automated(data[d]),
        y: data[d].manual,
        r: data[d].total,
      },
    ],
    fillColor: 'rgba(0,0,0,0)',
    backgroundColor: randomColorRGB({ opacity: 0.6 }),
  }));
  return sets;
}

function build(config, cucumberJSON) {
  return Promise.all(coverageData(config, cucumberJSON))
    .then(data => model(transform(flatten(data))));
}

module.exports = {
  build,
};

