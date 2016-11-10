# main modules
highlight = require 'highlight.js'
fountain = require './index.js'
metalsmith = require 'metalsmith'
moment = require 'moment'
rupture = require 'rupture'
watch = require 'glob-watcher'

# metalsmith plugins
cleanCss = require 'metalsmith-clean-css'
collections = require 'metalsmith-collections'
htmlMinifier = require 'metalsmith-html-minifier'
layouts = require 'metalsmith-layouts'
livereload = require 'metalsmith-livereload'
markdown = require 'metalsmith-markdownit'
pagination = require 'metalsmith-pagination'
paths = require 'metalsmith-paths'
permalinks = require 'metalsmith-permalinks'
stylus = require 'metalsmith-stylus'

# markdown-it plugins
emoji = require 'markdown-it-emoji'
footnote = require 'markdown-it-footnote'
katex = require 'markdown-it-katex'

# Watch source and layout directories for changes
# Likely not the most efficient way of doing this
# But whatever, dev environment
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
  metalsmith __dirname
    .source 'source'
    # files in /styles/ are consolidated by stylus
    .ignore ['**/styles/**/!(base.styl)']
    .use stylus
      use: [rupture()]
    .use md
    .use fountain()
    .use permalinks
      relative: false
    .use collections
      words:
        pattern: 'words/**/*.html'
        sortBy: 'date'
        reverse: true
    .use pagination
      'collections.words':
        perPage: 7
        first: 'words/index.html'
        path: 'words/:num/index.html'
        layout: 'words-index.pug'
    .use paths
      property: 'paths'
      directoryIndex: 'index.html'
    .use layouts
      engine: 'pug'
      moment: moment
    .use livereload # DEV ONLY
      debug: true
    #.use htmlMinifier() # PRODUCTION ONLY
    #.use cleanCss() # PRODUCTION ONLY
    .destination '../huw.github.io'
    .build (err) -> if err then throw err
    console.log 'built'

watcher1.on('change', build)
watcher2.on('change', build)
build()
