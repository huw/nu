# main modules
cpr = require 'cpr'
highlight = require 'highlight.js'
metalsmith = require 'metalsmith'
moment = require 'moment'
rupture = require 'rupture'
env = require('get-env')()

if env == 'dev'
  watch = require 'glob-watcher'
  livereload = require 'metalsmith-livereload'

# metalsmith plugins
cleanCss = require 'metalsmith-clean-css'
collections = require 'metalsmith-collections'
drafts = require 'metalsmith-drafts'
fileMetadata = require 'metalsmith-filemetadata'
fountain = require 'metalsmith-fountain'
htmlMinifier = require 'metalsmith-html-minifier'
imagemin = require 'metalsmith-imagemin/lib/node6'
layouts = require 'metalsmith-layouts'
markdown = require 'metalsmith-markdownit'
moveUp = require 'metalsmith-move-up'
paths = require 'metalsmith-paths'
stylus = require 'metalsmith-stylus'
updated = require 'metalsmith-updated'

# markdown-it plugins
emoji = require 'markdown-it-emoji'
footnote = require 'markdown-it-footnote'
katex = require 'markdown-it-katex'

# Watch source and layout directories for changes
# Likely not the most efficient way of doing this
# But whatever, dev environment
if env == 'dev'
  watcher1 = watch 'source/**/*'
  watcher2 = watch 'layouts/**/*'

# Access markdown-it parser to enable markdown-it plugins
md = markdown
  typographer: true
  quotes: '“”‘’'
  linkify: true
  highlight: (str, lang) ->
    if lang and highlight.getLanguage lang
      try
        return highlight.highlight(lang, str).value
    ''
md.parser.use emoji
md.parser.use footnote
md.parser.use katex

build = ->
  ms = metalsmith __dirname
    .source 'source'
    # files in /styles/ are consolidated by stylus
    .ignore ['**/styles/**/!(base.styl)', '**/static/**/*', '**/.DS_Store']
    .use drafts()
    .use fileMetadata [{
        pattern: 'content/**/*.md'
        metadata:
          layout: 'markdown.pug'
          collection: 'content'
        preserve: true
      }, {
        pattern: 'content/**/*.fountain'
        metadata:
          layout: 'fountain.pug'
          collection: 'content'
        preserve: true
      }]
    .use moveUp 'content/**'
    .use stylus
      use: [rupture()]
    .use md
    .use fountain
      title_page: false
      preserve_date: true
    .use updated
      filePatterns: ['**/*.html']
    .use collections
      content:
        sortBy: 'created'
        reverse: true
    .use paths
      property: 'paths'
      directoryIndex: 'index.html'
    .use layouts
      engine: 'pug'
      moment: moment

  if env == 'dev'
    ms.use livereload
      debug: true
  else
    ms.use htmlMinifier()
      .use cleanCss()
      .use imagemin()

  ms.destination 'build'
  ms.build (err) ->
    if err then throw err
    cpr('source/static', 'build',
      overwrite: true
      confirm: true
    (err) -> throw err if err)

if env == 'dev'
  watcher1.on('change', build)
  watcher2.on('change', build)

build()
