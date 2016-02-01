var should = require("should");
var logfac=require("../log.js");
describe("Logging",function(){
    var logger;
    before(function(){
        logger=logfac("Test");
    });
    it('should have point equal Test',function(){
        should(logger).have.property("point","Test");
    });
});


