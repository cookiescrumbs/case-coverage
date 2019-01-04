var domains,
testTypes,
junitXmlFolderPath;

function buildDomains(d) {
    var domain = {};
    domain[d] = buildTestTypes();
    return domain;
}

function buildTestTypes() {
    var type = {};
    testTypes.map(function(t){
        type[t] = {
            total: totalNumberOfTestForType()
        };
    });
    return type;
}

// test_coverage = domains.map do | d |
//     domain = d.delete '@'
// number_of_tests = test_types.map do | t |
//     test_type = t.delete '@'
// output_path = "./junit/#{domain}/#{test_type}"
// number_of_tests = Dir[output_path + '/*.xml'].map do | file_path |
//     print "#{file_path}\n"
//           doc = File.open(file_path) { | f | Nokogiri:: XML(f) }
// number_of_tests(doc)
// end.sum


// def number_of_tests(doc)
//     doc.xpath('//testsuite/@tests').to_s.to_i
// end


function totalNumberOfTestForType() {
    return 23;
}

function build(doms, testT, folderPath) {
    domains = doms;
    testTypes = testT;
    junitXmlFolderPath = folderPath;

    return domains.map(function(d) {
        return buildDomains(d, testTypes);
    });
}

module.exports = {
    build: build
}