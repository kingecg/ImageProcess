/* 
 * Use gm to get image meta data
 */

/* global value */

var util = require('util');
var ImageProcessor = require("../ImageProcessor");
var gm = require("gm");
var q = require("q");
var _=require("lodash");
var MetaProcessor = function () {

    ImageProcessor.call(this);
    this.processorName = "Meta";
};
util.inherits(MetaProcessor, ImageProcessor);
MetaProcessor.prototype._process_ = function (info, env, def) {
    var imageFileName = info.path + "/" + info.file;
    var that = this;
    info.meta = {};

    var gmImageObject = gm(imageFileName);
    //  gmImageObject.size().format(getInfo("format")).res(getInfo("res")).orientation(getInfo("orientation",def));
    this.getMeta(gmImageObject,info.meta).then(function(){
        this.logger.info("Get meta complete");
        def.resolve(info);
    });
};
MetaProcessor.prototype.getMeta = function (gmobj, meta) {
    var that = this;
    function getInfo(key) {
        return function () {
            var def = q.defer();
            gmobj[key](function (err, value) {
                if (err) {
                    that.logger.error(err.message);
                    def.resolve(meta);
                }
                that.logger.info("Get %s with value %s", key, value);
                meta[key] = value;
                def.resolve(meta);
            });
            return def.promise;
        };
    }
    ;
    var getMetaPromise = [];
    getMetaPromise.push(getInfo("size"));
    getMetaPromise.push(getInfo("format"));
    getMetaPromise.push(getInfo("res"));
    getMetaPromise.push(getInfo("orientation"));
    return _.reduce(getMetaPromise,function(promise,getf){
        return promise.then(getf);
    },q(meta));
};
module.exports = MetaProcessor;