/* 
 * This implements a chained call for used processor
 */
var q=require("q");
var _=require("lodash");
var logger=require("./log")("ProcessorChain");
var Chain = function(imageInfoObj){
    this.processors=[];
    this.originalInfo=imageInfoObj;
};
Chain.prototype.run = function(){
  return  _.reduce(this.processors,function(promise,processor){
      logger.debug("Run processor");
      return promise.then(processor)  ;
    },q(this.originalInfo));
};
Chain.prototype.add = function(processors){
    var that = this;
    _(processors).forEach(function(processor){
        
       that.processors.push(wrapToFunction(processor));
    });
};
var wrapToFunction = function(processorClasses){
  return function(info){
      var processor = new processorClasses();
      return processor.process(info);
  };  
};
module.exports=function(imageInfoObj,processorClasses){
    //should create chain at least
    var chain = new Chain(imageInfoObj);
    chain.add(processorClasses);
    return chain;
};


