
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , ArticleProvider = require('./articleprovider-memory').ArticleProvider
  , user = require('./routes/user')
  , student = require('./routes/student')
  , STL=require('./routes/StudentLogin')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});

/*
app.get('/', function(req, res){
    res.send('Hello World..............');
});
*/


var articleProvider= new ArticleProvider();

app.get('/', function(req, res){
    articleProvider.findAll( function(error,docs){
        res.render('index.jade', { locals: {
            title: 'Blog',
            articles:docs
        }
        });
    })
});

/*
app.get('/', function(req, res){
    articleProvider.findAll(function(error, docs){
        res.send(docs);
    });
});
*/


//app.get('/',routes.index);


//app.get('/student',student.RegisteredStudent);
app.get('/student',student.StudentLoginForm);

app.get('/studentLogin',STL.StudentLoginFormReports);

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
