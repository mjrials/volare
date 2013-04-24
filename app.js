
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , request = require('request');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/about', function(req, res){
  res.render('about', { title: 'Volare' });
});
app.get('/contact', function(req, res){
  res.render('contact', { title: 'Volare' });
});
app.get('/register', function(req, res){
  res.render('register', { title: 'Volare' });
});
app.get('/login', function(req, res){
  res.render('login', { title: 'Volare' });
});
app.get('/privacy', function(req, res){
  res.render('privacy', { title: 'Volare' });
});
app.get('/terms', function(req, res) {
  res.render('terms', { title: 'Volare' });
});

// -----------------------------------------------------------------------------------------------

app.post('/token', function(req, res){
  var url = 'http://api.master18.tiket.com/apiv1/payexpress?method=getToken&secretkey=7d620441561d5a9cf876294ce472866d&output=json';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body); 
    }
  });
});

// -----------------------------------------------------------------------------------------------

app.post('/search', function(req, res) {
  var url = 'https://api.master18.tiket.com/search/flight?d=SFO&a=ORD&date=2013-04-20&ret_date=2013-04-22&adult=1&child=0&infant=0&token=' + req.body + '&v=2&output=json'
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  })
});

// ------------------------------------------------------------------------------------------------

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
