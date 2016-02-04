var chainFactory= require("../lib/processorchain");
var ExifProcessor=require("../processors/ExifProcessor");
var MetaProcessor=require("../processors/MetaProcessor");
var info={
    path:"/home/elfcheng/NetBeansProjects/ImageProcess/test/data/sub",
    file:"IMG_0288.PNG"
};
var env={};
var util = require("util");
var processors = [MetaProcessor, ExifProcessor];
var chain = chainFactory(info, processors,env);
chain.run(info,env).then(function(result){
    console.log("chain run to end");
    console.log(util.inspect(result, { showHidden: true, depth: null }));
});