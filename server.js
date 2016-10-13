var express = require('express');
var proxy = require('express-http-proxy');
var url= require('url');
var app = express();


app.get('/proxy/:mode/:id', proxy('www.chemspider.com', {
    
  
    filter: function(req,res){
        return req.method=='GET';
    },
    forwardPath:function(req,res){
        var mode=req.params.mode;
        var id=req.params.id;
       
        if(mode == i2m){
            console.log(url.parse('/InChI.asmx/InChIKeyToMol?inchi_key='+id).path)
            return url.parse('/InChI.asmx/InChIKeyToMol?inchi_key='+id).path;
        }
        
        if(mode == m2i){
            console.log(url.parse('/InChI.asmx/MoltoInChIKey?inchi_key='+id).path)
            return url.parse('/InChI.asmx/MoltoInChIKey?inchi_key='+id).path;
        }
        
    },
    intercept: function(rsp,data,req,res,callback){
        
                
        res.writeHead(200,{'Access-Allow-Control-Origin':"*"})
        res.send(data.toString('utf8'));
    }
    
       
  
    
}));

app.get('/favicon.ico',function(req,res){
    //deal with annoying as heck favicon requests: https://gist.github.com/kentbrew/763822
    res.writeHead(200,{'Content-Type':'image/x-icon'});
    console.log('favicon req');
    res.end();
})


app.listen(process.env.PORT);

//var url ="https://www.chemspider.com/InChI.asmx/InChIKeyToMol?inchi_key="+compound;