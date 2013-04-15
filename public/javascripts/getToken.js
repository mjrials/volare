var http = require("http");

var options = {
    host: 'http://api.master18.tiket.com/apiv1/payexpress?method=getToken&secretkey=7d620441561d5a9cf876294ce472866d',
    port: 80,
    path: '/',
    method: 'GET'
};

http.get(options, function(res){
    var data = '';

    res.on('data', function (chunk){
        data += chunk;
    });

    res.on('end',function(){
        var obj = JSON.parse(data);
        alert(obj);
    })
});