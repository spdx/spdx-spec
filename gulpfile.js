/* Small script to automate common tasks 
 * such as building and publishing the GitBook
 *
 * Prerequisites:
 * npm install -g gitbook-cli gulp
 *
 * Note that for generating ePub, Mobi and PDF 
 * you have to install Callibre using these instructions
 * found at https://toolchain.gitbook.com/ebook.html
 *
 * Type 'gulp' to get available build and publish options
 */

const buildDir = './build/',
    cheerio = require('gulp-cheerio'),
    del = require('del'),
    documentName = 'spdx-specification',
    git = require('gulp-git'),
    gulp = require('gulp-help')(require('gulp'), { hideEmpty: true, hideDepsMessage: true }),
    gulpLoadPlugins = require('gulp-load-plugins'),
    prettify = require('gulp-jsbeautifier'),
    shell = require('gulp-shell'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    $ = gulpLoadPlugins();
var gitHash;

// Build each versions e.g. HTML, PDF, etc.
gulp.task('all', 'Generates all documument versions', ['html', 'pdf', 'epub', 'mobi']);

// Executes shell to build ePub output of GitBook
gulp.task('build-epub', false, shell.task([
    'gitbook epub ./ ./' + documentName + '.epub',
]));

// Executes shell to build HTML version of GitBook
gulp.task('build-html', false, shell.task([
    'gitbook build',
]));

// Executes shell to build Mobi version of GitBook
gulp.task('build-mobi', false, shell.task([
    'gitbook mobi ./ ./' + documentName + '.mobi',
]));

// Executes shell to build PDF version of GitBook
gulp.task('build-pdf', false, shell.task([
    'gitbook pdf ./ ./' + documentName + '.pdf',
]));

// Cleans ePUB build directory
gulp.task('clean-build-epub', false, (cb) => {
    return del([ buildDir + '*.epub']);
});

// Cleans HTML build directory
gulp.task('clean-build-html', false, (cb) => {
    del([ buildDir + 'html/**/*']).then(cb());
});

// Cleans Mobi build directory
gulp.task('clean-build-mobi', false, (cb) => {
    del([ buildDir + '*.mobi']).then(cb());
});

// Cleans PDF directory
gulp.task('clean-build-pdf', false, (cb) => {
    del([ buildDir + '*.pdf']).then(cb());
});

// Executes if user only executes 'gulp' command
gulp.task('default', false, ['help']);

// Generates ePub version of Gitbook in the buildDir directory
gulp.task('epub', 'Generates ePUB of the SPDX specification Gitbook in ' + buildDir, ['clean-build-epub','build-epub'], function (cb) {
    return gulp.src('./' + documentName + '.epub')
    .pipe(gulp.dest(buildDir))
    .on('end', () => {
        console.log("Completed building the ePub document from source MarkDown");
        del([
            './' + documentName + '.epub'
        ]);
    })
});

// Gets 7 digit short SHA1 Git hash
gulp.task('git-hash', false, (cb) => {
  return git.revParse({args:'--short HEAD'}, function(err, hash) {
     gitHash = hash;
     cb();
   });
});

// Generates HTML version of Gitbook in the buildDir directory
// and removes unneeded files
gulp.task('html', 'Generates HTML website in ' + buildDir, ['clean-build-html','build-html', 'git-hash'], (cb) => {
    gulp.src([
            './_book/chapters/**/*',
            './_book/gitbook/**/*',
            './_book/img/**/*',
            './_book/styles/**/*',
            './_book/index.html',
            './_book/LICENSE',
            './_book/search_index.json'
        ], { base: './_book' })
        .pipe(cheerio(function ($, file) {
          // Each file will be run through cheerio and each corresponding `$` will be passed here. 
          // `file` is the gulp file object 
      
          if (file.history[0].includes("chapters")) {
              // Insert Dublin Core Metadata tags for traceability
              $('meta[name="author"]')
              .append('\n<meta name="DC.source" content="https://github.com/spdx/spdx-spec">')
              .append('\n<meta name="DC.identifier" content="#' + gitHash + '">')
              .append('\n<meta name="DC.date.created" content="' + (new Date).toISOString() + '">')
              .append('\n<meta name="DC.rights" content="SPDX-License-Identifier: CC-BY-3.0">');
          }
        }))
        .pipe(prettify())
        .pipe(removeEmptyLines())
        .pipe(gulp.dest(buildDir + 'html/'))
        .on('end', () => {
            console.log("Completed building HTML files from source MarkDown");
            del('./_book').then(cb());
        })
});

// Generates Mobipocket version of Gitbook in the buildDir directory
gulp.task('mobi', 'Generates Mobipocket of the SPDX specification Gitbook in ' + buildDir, ['clean-build-mobi','build-mobi'], (cb) => {
    return gulp.src('./' + documentName + '.mobi')
    .pipe(gulp.dest(buildDir))
    .on('end', () => {
        console.log("Completed building the Mobi document from source MarkDown");
        del([
            './' + documentName + '.mobi'
        ]);
    })
});

// Generates PDF version of Gitbook in the buildDir directory
gulp.task('pdf', 'Generates PDF of the SPDX specification Gitbook in ' + buildDir, ['clean-build-pdf','build-pdf'], (cb) => {
    return gulp.src('./' + documentName + '.pdf')
        .pipe(gulp.dest(buildDir))
        .on('end', () => {
            console.log("Completed building the PDF document from source MarkDown");
            del([
                './' + documentName + '.pdf'
            ]);
        })
});

// Publish the build HTML version of GitBook to GitHub Pages
gulp.task('publish', ['git-hash', 'html'], () => {
    console.log('Publishing HTML #' + gitHash + ' to Github GH Pages');
    return gulp.src(buildDir + 'html/**/*')
        .pipe($.ghPages({
            origin: 'origin',
            branch: 'gh-pages',
            message: "Update based on #" + gitHash
        }));
});