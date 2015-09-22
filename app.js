var connect = require('connect')
	,logger = require('morgan')
	,static = require('serve-static')
	,compression = require('compression')
	,path = require('path')
	,fs = require('fs')
	,http = require('http')
	,https = require('https')

var app = connect()

compression.level = 9
compression.threshold = false

logger.format('custom', function developmentFormatLine(tokens, req, res) {
  // get the status code if response written
  var status = res._header
    ? res.statusCode
    : undefined

  // get status color
  var color = status >= 500 ? 31 // red
    : status >= 400 ? 33 // yellow
    : status >= 300 ? 36 // cyan
    : status >= 200 ? 32 // green
    : 0 // no color

  // get colored function
  var fn = developmentFormatLine[color]

  if (!fn) {
    // compile
    fn = developmentFormatLine[color] = logger.compile('\x1b[90m:remote-addr - :method `:url` \x1b[7m\x1b['
      + color + 'm:status\x1b[0m \x1b[90mat :date[iso] (:response-time ms)\x1b[0m')
  }

  return fn(tokens, req, res)
})

if (fs.existsSync(path.join(__dirname, 'spacerave2014'))) {
	app.use('/space', static(path.join(__dirname, 'spacerave2014')));
	app.use('/spacerave2014', static(path.join(__dirname, 'spacerave2014')));
	app.use('/spacerave', static(path.join(__dirname, 'spacerave2014')));
}

app.use(logger('custom'))
app.use(compression())
app.use(static(path.join(__dirname, 'public')))

var options = {
	key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
	cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt'))
}

http.createServer(app).listen(80)
https.createServer(options, app).listen(443)
