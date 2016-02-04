/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//every processor should have a method called process
var logFact = require("./lib/log.js");
var q = require("q");
var ImageProcessor=function(){
    this.processorName="Sample";//the implemented processor must set this property self
   
};
ImageProcessor.prototype.inited=false;
ImageProcessor.prototype.logger = null;
ImageProcessor.prototype.init = function(){
    //init logger
    console.log("init");
    this.logger=logFact(this.processorName);
    this.inited = true;
};

ImageProcessor.prototype.process=function(info,env){
    var def=q.defer();
    if(!this.inited){
        this.init();
    }
    this.logger.info("Processor %s begin to process file %s",this.processorName,info.file);
    if(this._process_ && typeof this._process_ === "function"){
        this._process_ (info,env,def);
    }
    this.logger.info("Processor %s end to process %s",this.processorName,info.file);
    return def.promise;
};
exports=module.exports=ImageProcessor;