/* 
 * Read image Exif if it exists
 */
var ExifImage = require('exif').ExifImage;
var util = require('util');
var ImageProcessor = require("../ImageProcessor");
var ExifProcessor = function () {
    
    ImageProcessor.call(this);
    this.processorName = "Exif";
};
util.inherits(ExifProcessor, ImageProcessor);

ExifProcessor.prototype._process_ = function (info, env,def) {
    
    var imageFileName = info.path + "/" + info.file;
    var that = this;
    try {
        new ExifImage({image: imageFileName}, function (error, exifData) {
            if (error)
                that.logger.error(error.message);
            else
            {
                info.exif=exifData;
                
            }
            def.resolve(info);
        });
    } catch (error) {
        
        this.logger.error(error.message);
        def.resolve(info);
    }
   
};
module.exports = ExifProcessor;
