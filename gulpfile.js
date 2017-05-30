/* Small script to automate common tasks 
 * such as building and publishing the GitBook
 *
 * Prerequisites:
 * npm install -g gitbook-cli gulp
 *
 * Note that for generating ePub, Mobi and PDF 
 * you have to install Callibre using these instructions
 * found at https://toolchain.gitbook.com/ebook.html
 */

const buildDir = './build/',
    del = require('del'),
    documentName = 'spdx-specification',
    gitbook = require('gitbook'),
    gulp = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    shell = require('gulp-shell'),
    xQ = require('q'),
    $ = gulpLoadPlugins();

// Build each versions e.g. HTML, PDF, etc.
gulp.task('all', ['html', 'pdf', 'epub', 'mobi']);

// Executes shell to build ePub output of GitBook
gulp.task('build-epub', shell.task([
    'gitbook epub ./ ./' + documentName + '.epub',
]));

// Executes shell to build HTML version of GitBook
gulp.task('build-html', shell.task([
    'gitbook build',
]));

// Executes shell to build Mobi version of GitBook
gulp.task('build-mobi', shell.task([
    'gitbook mobi ./ ./' + documentName + '.mobi',
]));

// Executes shell to build PDF version of GitBook
gulp.task('build-pdf', shell.task([
    'gitbook pdf ./ ./' + documentName + '.pdf',
]));

// Cleans ePub build directory
gulp.task('clean-build-epub', (cb) => {
    return del([ buildDir + '*.epub']);
});

// Cleans HTML build directory
gulp.task('clean-build-html', (cb) => {
    return del([ buildDir + 'html/**/*']);
});

// Cleans Mobi build directory
gulp.task('clean-build-mobi', (cb) => {
    return del([ buildDir + '*.mobi']);
});

// Cleans PDF directory
gulp.task('clean-build-pdf', (cb) => {
    return del([ buildDir + '*.pdf']);
});

// Executes if user only executes 'gulp' command
gulp.task('default', ['html']);

// Generates ePub version of Gitbook in the buildDir directory
gulp.task('epub', ['clean-build-epub','build-epub'], function (cb) {
    return gulp.src('./' + documentName + '.epub')
    .pipe(gulp.dest(buildDir))
    .on('end', () => {
        console.log("Completed building the ePub document from source MarkDown");
        del([
            './' + documentName + '.epub'
        ]);
    })
});

// Generates HTML version of Gitbook in the buildDir directory
// and removes unneeded files
gulp.task('html', ['clean-build-html','build-html'], (cb) => {
    return gulp.src('./_book/**/*')
    .pipe(gulp.dest(buildDir + 'html/'))
    .on('end', () => {
        console.log("Completed building HTML files from source MarkDown");
        del([
            './_book',
            buildDir + 'html/*',
            '!' + buildDir + 'html/chapters',
            '!' + buildDir + 'html/gitbook',
            '!' + buildDir + 'html/img',
            '!' + buildDir + 'html/styles',
            '!' + buildDir + 'html/index.html',
            '!' + buildDir + 'html/LICENSE',
            '!' + buildDir + 'html/search_index.json'
        ]);
    })
});

// Generates Mobi version of Gitbook in the buildDir directory
gulp.task('mobi', ['clean-build-mobi','build-mobi'], function (cb) {
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
gulp.task('pdf', ['clean-build-pdf','build-pdf'], function (cb) {
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
gulp.task('publish', ['html'], (args) => {
    console.log('Publishing to Github GH Pages');
    return gulp.src(buildDir + '/html/**/*')
    .pipe($.ghPages({
        origin: 'origin',
        branch: 'gh-pages'
    }));
});