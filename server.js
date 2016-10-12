var express = require('express');
var proxy = require('express-http-proxy');
var url= require('url');
var app = express();


app.use('/proxy', proxy('www.chemspider.com/InChI.asmx/', {
    filter: function(req,res){
        return req.method=='GET';
    },
    forwardPath:function(req,res){
        return url.parse(req.url);
        
    },
    intercept: function(rsp,data,req,res,callback){
        
        console.log(rsp);
    }
    
    
})

app.listen(process.env.PORT);