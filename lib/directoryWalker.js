/* 
 * This module is used to walk through a specified folder
 */
var util = require("util");
var events = require("events");
var fs = require("fs");
var logger = require("./log")("DirWalker");
var _ = require("lodash");
var pathutil = require("path");
/**
 * 
 * @param {type} path directory to scan
 * @param {type} filter wanted file extension
 * @returns {nm$_directoryWalker.DirectoryWalker}
 */
function DirectoryWalker(path, filter) {
    this.path = path;
    if (filter) {
        if (_.isString(filter)) {
            this.filter = _.split(filter, ";").map(function(ext){
                return "."+_.toUpper(ext);
            });//use ; to split extensions
        } else if (_.isArray(filter)) {
            this.filter = filter.map(function(ext){
                return "."+_.toUpper(ext);
            });
        }
    }
    events.EventEmitter.call(this);
}
util.inherits(DirectoryWalker, events.EventEmitter);

DirectoryWalker.prototype.walk = function (path) {
    var startpath = path ? path : this.path;
    var that = this;
    logger.info("Begin to scan dir %s", startpath);
    fs.readdir(startpath, function (error, files) {
        if (error) {
            throw error;
        }
        _.forEach(files, function (file) {

            that.stateFile(startpath, file);
        });
    });

};
DirectoryWalker.prototype.stateFile = function (path, file) {
    logger.info("Begin state file %s under directory %s", file, path);
    var that = this;
    var tmpFilePath = path + "/" + file;
    fs.stat(tmpFilePath, function (err, state) {
        if (state.isDirectory()) {
            logger.info("%s is a directory", tmpFilePath);
            that.walk(tmpFilePath);
        } else {
            var isRequired = true;
            if (that.filter) {
                var fileExt = pathutil.extname(file);
                logger.debug("file ext is %s",fileExt);
                var upperFileExt = _.toUpper(fileExt);
                
                if (that.filter.indexOf(upperFileExt) === -1 ) {
                   isRequired = false;
                }
            }
            if(isRequired){
                 var fileObj = {
                        "path": path,
                        "file": file
                    };
                    that.emit("getfile", fileObj);
                    return;
            }
            logger.debug("type of filename:%s",typeof file);
            logger.info("File %s not meet out need",file);
        }
    });
};
module.exports = DirectoryWalker;