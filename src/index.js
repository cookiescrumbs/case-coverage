var CaseCoverage  = function(domains, testTypes, junitXmlFolderPath) {
    this.domains = domains;
    this.testTypes = testTypes;
    this.junitXmlFolderPath = junitXmlFolderPath;
}

function buildDomains(d) {
    var domain = {};
    domain[d] = buildTestTypes(this.testTypes);
    return domain;
}

function buildTestTypes(types) {
    var type = {};
    types.map(function(t){
        type[t] = {
            total: totalNumberOfTestForType(t)
        };
    });
    return type;
}

function totalNumberOfTestForType() {
    return 23;
}

CaseCoverage.prototype.build = function() {
    return this.domains.map(function(d) {
        return buildDomains.call(this, d);
    }.bind(this));
}

module.exports = {
    caseCoverage: CaseCoverage
}