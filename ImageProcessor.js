/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//every processor should have a method called process
var logFact = require("./log.js");
var ImageProcessor=function(){
    this.processorName="Sample";//the implemented processor must set this property self
   
};
ImageProcessor.prototype.inited=false;
ImageProcessor.prototype.init = function(){
    //init logger
    this.logger=logFact(this.processorName);
};

ImageProcessor.prototype.process=function(filename){
    if(!this.inited){
        this.init();
    }
    this.logger.info("Begin to process ",filename);
    if(this._process_ && typeof this._process_ === "function"){
        this._process_ (filename);
    }
    this.logger.info("End to process ",filename);
};
exports=module.exports=ImageProcessor;