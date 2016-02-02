/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var colors = require('colors/safe');
var util=require("util");
var msgColor={
   "info":"green",
   "debug":"blue",
   "error":"red"
};
var log = function(logPoint){
   this.point=logPoint; 
};
log._msg = function (loggingLevel) {
    var mColor=msgColor[loggingLevel];
   
   return function(){
    //   var logMsg="["+this.point+"] "+(new Date()).toLocaleString() +"-"+msg;
  
    var logMsgTemplate="[%s] %s-";
       var logMethod = console[loggingLevel]?console[loggingLevel]:console.log;
      //logMethod(colors[mColor](logMsgTemplate),this.point,(new Date()).toLocaleString(),arguments);
      var msgArgs=Array.prototype.slice.call(arguments);
      var msgTP=msgArgs.shift();
     var args=[logMsgTemplate.concat(msgTP),this.point,(new Date()).toLocaleString()].concat(msgArgs);
     var msgStr=util.format.apply(null,args);
//     var colorargs=args.map(function(str){
//         console.log(str+"-"+colors[mColor](str));
//        return colors[mColor](str);
//     });
   logMethod(colors[mColor](msgStr));
   } ;
};
log.prototype.info=log._msg("info");
log.prototype.debug=log._msg("debug");
log.prototype.error=log._msg("error");
module.exports= function(point){
    return new log(point);
};
