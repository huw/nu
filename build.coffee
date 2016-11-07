metalsmith = require 'metalsmith'
collections = require 'metalsmith-collections'
dates = require 'metalsmith-date-formatter'
layouts = require 'metalsmith-layouts'
livereload = require 'metalsmith-livereload'
markdown = require 'metalsmith-markdown'
pagination = require 'metalsmith-pagination'
paths = require 'metalsmith-paths'
permalinks = require 'metalsmith-permalinks'
stylus = require 'metalsmith-stylus'
highlighter = require 'highlighter'
watch = require 'glob-watcher'

watcher = watch('source/**/*')

watcher.on 'change', ->
  metalsmith __dirname
    .source 'source'
    .use dates
      dates: 'date'
      format: 'MMMM D YYYY'
    .use stylus
      compress: true
    .use markdown
      highlight: highlighter()
    .use permalinks
      reverse: false
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
    .use livereload
      debug: true
    .destination '../build'
    .build (err) -> if err then throw err
    console.log 'built'
