/**
 * Module dependencies.
 */

var express = require('express');
var routes  = require('./routes');
var http    = require('http');
var path    = require('path');
var fs      = require('fs');

// Import my dependencies
var request = require('request');
var async   = require('async');

var app     = express();

// All environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use('/', express.static(path.join(__dirname, 'public')));
if (fs.existsSync(path.join(__dirname, 'spacerave2014'))) {
	app.use('/space', express.static(path.join(__dirname, 'spacerave2014')));
	app.use('/spacerave2014', express.static(path.join(__dirname, 'spacerave2014')));
	app.use('/spacerave', express.static(path.join(__dirname, 'spacerave2014')));
}

app.enable('trust proxy');

// Development only
if ('development' == app.get('env')) {
 	app.use(express.errorHandler());
}

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});