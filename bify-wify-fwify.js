var browserify = require('browserify')
  , watchify   = require('watchify')
  , source     = require('vinyl-source-stream')
  , buffer     = require('vinyl-buffer')
  , gutil      = require('gulp-util')
  , gulp       = require('gulp')
  , extend     = require('extend')

function either (given, deflt) {
  return typeof given === 'undefined' ? deflt : given
}

function bundle (b, name, dest) {
  return b.bundle()
    .pipe(source(name))
    .pipe(buffer())
    .pipe(gulp.dest(dest))
}

function bify (entries, opt) {
  var b = browserify(extend({
    debug: true,
    entries: entries
  }, either(opt, {})))

  b.on('log', gutil.log)

  return b
}

function wify (entries, opt) {
  var b = watchify(bify(entries, opt))

  b.on('error', gutil.log)

  return b
}

function fbify (entries, outfile, dest, opt) {
  if (dest instanceof Object)
    opt = dest, dest = undefined
  dest = either(dest, 'dist')

  var b = bify(entries, opt)

  return bundle(b, outfile, dest)
}

function fwify (entries, outfile, dest, opt) {
  if (dest instanceof Object)
    opt = dest, dest = undefined
  dest = either(dest, 'dist')

  var b = wify(entries, opt)

  function bundleOnce () {
    console.log('Bundle (fwify)')
    return bundle(b, outfile, dest)
  }

  b.on('update', bundleOnce)

  bundleOnce()
}

var bifywify = {
  fbify: fbify,
  fwify: fwify
}

module.exports = bifywify
