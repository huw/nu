# koa modules
koa = require 'koa'
cache = require 'koa-redis-cache'
compress = require 'koa-compress'
logger = require 'koa-logger'
sslify = require 'koa-sslify'
serve = require 'koa-static'
letsencrypt_express = require 'letsencrypt-express'

# other modules
env = require('get-env')()
http = require 'http'
https = require 'spdy'
os = require 'os'
require('./build').build()

force_domain = (next) ->
  request = this.request
  host = request.hostname

  if (host.startsWith('www'))
    this.status = 301
    this.redirect 'https://huw.nu' + request.url
  else
    yield next

app = new koa()
app.use logger
  level: 9
app.use force_domain
app.use cache
  expire: 2592000 # 30 days
  routes: ['/fonts', '/styles']
app.use cache
  expire: 432000  # 5 days
  exclude: ['/fonts', '/styles']
app.use compress()
app.use serve 'build'

if env == 'prod'
  # configure letsencrypt
  le = letsencrypt_express.create
    server: 'https://acme-v01.api.letsencrypt.org/directory'
    configDir: os.homedir() + '/letsencrypt/etc'
    approveDomains: (options, certificates, callback) ->
      options.domains = certificates && certificates.altnames ||
        ['huw.nu', 'www.huw.nu']
      options.email = 'me@huw.nu'
      options.agreeTos = true

      callback null, {
        options: options
        certs: certificates
      }
    debug: true

  # start main server
  server = https.createServer(le.httpsOptions, le.middleware(app.callback()))
  server.listen 443, -> console.log 'listening on %s', this.address()

  # HTTP -> HTTPS redirect
  koa_redirect = (new koa()).use(sslify()).callback()
  redirect_https = http.createServer(le.middleware(koa_redirect))
  redirect_https.listen 80, -> console.log 'running http redirect'

else if env == 'dev'
  server = http.createServer(app.callback())
  server.listen 80, -> console.log 'listening on %s', this.address()
