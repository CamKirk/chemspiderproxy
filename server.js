var express = require('express');
var proxy = require('express-http-proxy');
var url= require('url');
var app = express();


app.get('/proxy/i2m/:id', proxy('www.chemspider.com', {
    
    filter: function(req,res){
        return req.method=='GET';
    },
    forwardPath:function(req,res){
        var meth=req.params.meth;
        var id=req.params.id;
        console.log(res.url);
        console.log(url.parse('/InChI.asmx/InChIKeyToMol?inchi_key='+id).path)
        return url.parse('/InChI.asmx/InChIKeyToMol?inchi_key='+id).path;
        
    },
    intercept: function(rsp,data,req,res,callback){
        
        res.send(data.toString('utf8'));
    }
    
    
}));

app.get('/proxy/m2i/:id', proxy('www.chemspider.com', {
    
    filter: function(req,res){
        return req.method=='GET';
    },
    forwardPath:function(req,res){
        var meth=req.params.meth;
        var id=req.params.id;
        console.log(res.url);
        console.log(url.parse('/InChI.asmx/MoltoInChIKey?inchi_key='+id).path)
        return url.parse('/InChI.asmx/MoltoInChIKey?inchi_key='+id).path;
        
    },
    intercept: function(rsp,data,req,res,callback){
        
        res.send(data.toString('utf8'));
    }
    
    
}));

app.listen(process.env.PORT);

//var url ="https://www.chemspider.com/InChI.asmx/InChIKeyToMol?inchi_key="+compound;