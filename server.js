var express = require('express');
var proxy = require('express-http-proxy');
var url= require('url');
var app = express();


app.use('/proxy/:meth/:id', proxy('www.chemspider.com/InChI.asmx/', {
    
    filter: function(req,res){
        return req.method=='GET';
    },
    forwardPath:function(req,res){
        var meth=req.params.meth;
        var id=req.params.id;
        return url.parse(req.url+'/'+meth+'/'+id);
        
    },
    intercept: function(rsp,data,req,res,callback){
        
        console.log(rsp);
    }
    
    
}));

app.listen(process.env.PORT);