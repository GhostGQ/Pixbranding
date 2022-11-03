// Main module
import gulp from 'gulp'
// Paths import
import {path} from './gulp/config/path.js'
// Plugins import
import {plugins} from './gulp/config/plugins.js'

// Passing values in global variable
global.app = {
  isBuild: process.argv.includes('--build'),
  isDev: !process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins
}

// Tasks import
import {copy} from './gulp/tasks/copy.js'
import {reset} from './gulp/tasks/reset.js'
import {html} from './gulp/tasks/html.js'
import {server} from './gulp/tasks/server.js'
import {scss} from './gulp/tasks/scss.js'
import {js} from './gulp/tasks/js.js'
import {images} from './gulp/tasks/images.js'
import {otfToTtf, ttfToWoff, fontStyle} from './gulp/tasks/fonts.js'
import {zip} from './gulp/tasks/zip.js'
import {ftp} from './gulp/tasks/ftp.js'

// Watcher 
function watcher() {  
  gulp.watch(path.watch.files, copy) //gulp.series(html, ftp)
  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.scss, scss)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.images, images)
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fontStyle)

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images))

// Building runnning tasks Scripts
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZip = gulp.series(reset, mainTasks, zip)
const deployFTP = gulp.series(reset, mainTasks, ftp)

// Export Skripts
export { dev }
export { build }
export { deployZip }
export { deployFTP }

// Scripts executions by default 
gulp.task('default', dev)
