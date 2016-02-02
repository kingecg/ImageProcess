/**
* Process photo in one folder with following action:
* 1) scan all photos
* 2) flat the folder, cp all photo into one folder
* 3) insert photo information into mango db
*/
var IMG_EXTENSION=[];//photo extension
var logger = require("./lib/log.js")("Main");
var app = {};
app.srcDirectory=".";
app.opt = require("commander");
app.opt.version('0.0.1');
app.opt.usage('[options] [srcDirectory]');
app.opt.option('-f, --flat',"flat photo directory structure to one folder");
app.opt.option('-r, --raw',"Process raw format photos");
app.opt.option('-t, --thumbnail',"Generate thumbnail for photos");
app.opt.option('-d, --destDir <path>',"Out put dest directory");
app.opt.parse(process.argv);
//Following test for command line opt
if(app.opt.args.length ===  1){
	app.srcDirectory = app.opt.args[0];
}else if(app.opt.args.length > 0){
	app.opt.help();
}
