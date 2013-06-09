// var http = require('http');
// var url = 'http://api.master18.tiket.com/apiv1/payexpress?method=getToken&secretkey=7d620441561d5a9cf876294ce472866d&output=json';

// var req = http.get(url, function(res) {
//     var body = '';

//     res.on('data', function(chunk) {
//         body += chunk;
//     });

//     res.on('end', function() {
//          res.writeHead(200, { 'Content-Type': 'application/json' });
//          res.write(body);
//          res.end();

//         // var response = JSON.parse(body)
//         // var jsonToken = '{\n"token":"' + response.token + '"\n}';
        
//     });
// });

// // req.writeHead(200, { 'Content-Type': 'application/json' });
// // req.write(body);
// // req.end();