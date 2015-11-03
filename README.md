## Bify, Wify, Fwify... erm, something, something... Boilerplate, begone!

MAgIc away some exceedingly boring gulp + browserify boilerplate!

```js
// in gulpfile
var Const    = require(‘const’) // magic away some function boilerplate
  , bifywify = require(‘bify-wify’) // bify-wify away!

// We have a few bundles
gulp.task(‘bundle:src’,  Const ( bifywify.fbify(‘src/index.js’, ‘my.src.bundle.js’) ))
gulp.task(‘bundle:test’, Const ( bifywify.fbify(‘tests’, ‘my.tests.bundle.js’) ))

// We wanna watch for changes
gulp.task(‘watch:src’,  Const ( bifywify.fwify(‘src/index.js’, ‘my.src.bundle.js’) ))
gulp.task(‘watch:test’, Const ( bifywify.fwify(‘tests’, ‘my.tests.bundle.js’) ))
gulp.task(‘watch’, [ ‘watch:src’, ‘watch:test’ ])
```

Easy, right? No more requiring a bunch of `vinyl-source-stream` and `vinyl-buffer` and
other nonsense just to get browserify and gulp to play nice together, and no need
for a special gulp plugin that the gulp people might just blacklist.

It does all that for you.

## What's a fbify/fwify?

```js
fbify (entries, outfile, dest, opt) // equiv.: bundle this stuff
fwify (entries, outfile, dest, opt) // equiv.: watchify this stuff
```

Pass 'entries' and 'outfile' to get a task for bundling or watchifying, respectively

Optionally pass in a 'dest' to tell it to put those bundles someplace other than the
default folder, 'dist'

And optionally pass in an object for 'opt' with any other browserify/watchify opts that
you want set.
