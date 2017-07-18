/* Small script to automate common tasks
 * such as building and publishing the GitBook
 *
 * Script licensed under SPDX-License-Identifier: MIT
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

const outputDir = './dist/',
    cheerio = require('gulp-cheerio'),
    del = require('del'),
    documentName = 'spdx-specification',
    git = require('gulp-git'),
    gulp = require('gulp-help')(require('gulp'), { hideEmpty: true, hideDepsMessage: true }),
    filter = require('gulp-filter');
    gulpLoadPlugins = require('gulp-load-plugins'),
    prettify = require('gulp-jsbeautifier'),
    shell = require('gulp-shell'),
    removeEmptyLines = require('gulp-remove-empty-lines'),
    webServer = require('gulp-server-livereload'),
    $ = gulpLoadPlugins();
var gitHash;

// Build each versions e.g. HTML, PDF, etc.
gulp.task('all', 'Generate all documument versions.', ['html', 'pdf', 'epub', 'mobi']);

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
    return del([ outputDir + '*.epub']);
});

// Cleans HTML build directory
gulp.task('clean-build-html', false, (cb) => {
    del([ outputDir + 'html/**/*']).then(cb());
});

// Cleans Mobi build directory
gulp.task('clean-build-mobi', false, (cb) => {
    del([ outputDir + '*.mobi']).then(cb());
});

// Cleans PDF directory
gulp.task('clean-build-pdf', false, (cb) => {
    del([ outputDir + '*.pdf']).then(cb());
});

// Executes if user only executes 'gulp' command
gulp.task('default', false, ['help']);

// Generates ePub version of Gitbook in the outputDir directory
gulp.task('epub', 'Generate ePUB in ' + outputDir, ['clean-build-epub','build-epub'], function (cb) {
    return gulp.src('./' + documentName + '.epub')
    .pipe(gulp.dest(outputDir))
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

// Generates HTML version of Gitbook in the outputDir directory
// and removes unneeded files
gulp.task('html', 'Generate HTML website in ' + outputDir, ['clean-build-html','build-html', 'git-hash'], (cb) => {
    // Create filter instance inside task function
    const excludeFilter = filter([
        '**',
        '!*/gitbook/**/*',
        '!*/img/**/*',
        '!*/LICENSE'
    ], {restore: true}),
    htmlFilter = filter('**/*.html', {restore: true});

    // Copy files to outputDir whilst doing that beautify them
    gulp.src([
            './_book/chapters/**/*',
            './_book/gitbook/**/*',
            './_book/img/**/*',
            './_book/LICENSE',
            './_book/styles/**/*',
            './_book/index.html',
            './_book/search_index.json'
        ], { base: './_book' })
        // Filter a subset of the files
        .pipe(excludeFilter)
        .pipe(htmlFilter)
        // Modify only the HTML files
        .pipe(cheerio(($, file) => {
          // Each file will be run through cheerio and each corresponding `$` will be passed here.
          // `file` is the gulp file object

          // Insert Dublin Core Metadata tags for traceability
          $('meta[name="author"]')
          .append('\n<meta name="DC.source" content="https://github.com/spdx/spdx-spec">')
          .append('\n<meta name="DC.identifier" content="#' + gitHash + '">')
          .append('\n<meta name="DC.date.created" content="' + (new Date).toISOString() + '">')
          .append('\n<meta name="DC.rights" content="SPDX-License-Identifier: CC-BY-3.0">');

          // Insert SPDX logo
          $('.book-summary ul.summary li a.gitbook-link')
          .parent().prepend('\n<a class="logo" href="https://spdx.org" target="_blank"><span class="logo"/></a>')
        }))
        // Bring back the previously filtered out non-HTML files
        .pipe(htmlFilter.restore)
        // Beautify the HTML, CSS and JS files
        .pipe(prettify())
        .pipe(removeEmptyLines())
        // Bring back the previously filtered out files (optional)
        .pipe(excludeFilter.restore)
        .pipe(gulp.dest(outputDir + 'html/'))
        .on('end', () => {
            console.log("Completed building HTML files from source MarkDown");
            del('./_book').then(cb());
        })
});

// Generates Mobipocket version of Gitbook in the outputDir directory
gulp.task('mobi', 'Generate Mobipocket in ' + outputDir, ['clean-build-mobi','build-mobi'], (cb) => {
    return gulp.src('./' + documentName + '.mobi')
    .pipe(gulp.dest(outputDir))
    .on('end', () => {
        console.log("Completed building the Mobi document from source MarkDown");
        del([
            './' + documentName + '.mobi'
        ]);
    })
});

// Generates PDF version of Gitbook in the outputDir directory
gulp.task('pdf', 'Generate PDF in ' + outputDir, ['clean-build-pdf','build-pdf'], (cb) => {
    return gulp.src('./' + documentName + '.pdf')
        .pipe(gulp.dest(outputDir))
        .on('end', () => {
            console.log("Completed building the PDF document from source MarkDown");
            del([
                './' + documentName + '.pdf'
            ]);
        })
});

// Publish the build HTML version of GitBook to GitHub Pages
gulp.task('publish', 'Publish HTML to GitHub pages.', ['git-hash', 'html'], () => {
    console.log('Publishing HTML #' + gitHash + ' to Github GH Pages');
    return gulp.src(outputDir + 'html/**/*')
        .pipe($.ghPages({
            origin: 'origin',
            branch: 'gh-pages',
            message: "Update based on #" + gitHash
        }));
});

// Helper function to monitor MarkDown Files for
// change. On change rebuild HTML version of GitBook
gulp.task('watch', () => {
    gulp.watch('./chapters/*.md', ['html']);
    gulp.watch('./*.md', ['html']);
});

// Executes local webserver to host HTML version of GitBook
// Rebuilds all HTML automatically on change of MarkDown file
gulp.task('webserver', 'Open a web browser to webserver and will rebuild HTML on file change.', ['html', 'watch'], () => {
  gulp.src(outputDir + 'html/').pipe(webServer({
    host: '127.0.0.1',
    port:'9090',
    livereload: false,
    open: true
  }));
});