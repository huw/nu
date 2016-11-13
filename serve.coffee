# koa modules
koa = require 'koa'
sslify = require 'koa-sslify'
serve = require 'koa-static'
letsencrypt_express = require 'letsencrypt-express'

# other modules
http = require 'http'
https = require 'spdy'
os = require 'os'

app = koa()
app.use serve 'huw.github.io'

# configure letsencrypt
le = letsencrypt_express.create
  server: 'staging'
  configDir: os.homedir() + '/letsencrypt/etc'
  approveDomains: (options, certificates, callback) ->
    options.domains = certificates && certificates.altnames || options.domains
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
koa_redirect = koa().use(sslify()).callback()
redirect_https = http.createServer(le.middleware(koa_redirect))
redirect_https.listen 80, -> console.log 'running http redirect'

app.listen(8080)
