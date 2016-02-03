/* 
 * Test processors chain
 */

var should = require("should");
var chainFactory = require("../lib/processorchain");
var q = require("q");
var _ = require("lodash");
describe("Test for processor chain", function () {
    var TestProcessor = function () {};
    TestProcessor.prototype.process = function (info) {
        var def = q.defer();
       
            info.p1 = "tp";
            def.resolve(info);
       
        return def.promise;
    };
    var TestProcessor1 = function () {};
    TestProcessor1.prototype.process = function (info) {
        var def = q.defer();
        
            
            info.p2 = "tp1";
            def.resolve(info);
       
        return def.promise;
    };
    it("should have two processor in chain", function () {
        var processors = [TestProcessor, TestProcessor1];
        var chain = chainFactory({}, processors);
        should(chain.processors.length).equal(2);
    });
    it("should run every processor in chain", function (done) {
        
        var processors = [TestProcessor, TestProcessor1];
        var info = {};
        var chain = chainFactory(info, processors);
        chain.run().then(function (result) {
           
            should(info).have.property("p1", "tp");
            should(info).have.property("p2", "tp1");
            
            done();
        });

    });
});
