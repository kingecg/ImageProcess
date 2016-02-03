/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var should = require("should");

var DirectoryWalker = require("../lib/directoryWalker");
describe("Test for directory walker",function(){
    
    it("should get 4  files from test dir",function(done){
       
        var dw=new DirectoryWalker("test/data");
        var filescount = 0;
        dw.on('getfile',function(){
            filescount++;
            if(filescount === 4){
              done();
            }
        });
        dw.walk();
       
    });
    it("should get 2 txt files from test dir",function(done){
       
        var dw=new DirectoryWalker("test/data","txt");
        var filescount = 0;
        dw.on('getfile',function(){
            filescount++;
            if(filescount === 2){
              done();
            }
        });
        dw.walk();
       
    });
     it("should get 3 image files from test dir",function(done){
       
        var dw=new DirectoryWalker("test/data","png;jpg");
        var filescount = 0;
        dw.on('getfile',function(){
            filescount++;
            if(filescount === 3){
              done();
            }
        });
        dw.walk();
       
    });
});

