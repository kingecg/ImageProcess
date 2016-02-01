/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var ImageProcessor=require("./ImageProcessor.js");
var TestProcessor = function(){
   this.processorName="Test Process" ;
   this._process_=function(){
       this.logger.debug("Test for template %s","S1");
   };
};
TestProcessor.prototype=new ImageProcessor();
var tp=new TestProcessor();
tp.process("TestJPEG");

