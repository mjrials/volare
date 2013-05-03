
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

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

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
