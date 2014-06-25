/*
 * grunt-auto-install
 * https://github.com/norcalli/grunt-auto-install
 *
 * Copyright (c) 2014 Ashkan Kiani
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  // TODO: Uninstall unused option?
  grunt.registerTask('auto_depend', 'Auto install grunt dependencies from grunt.loadNpmTasks as you program so that you can be even lazier.', function() {
    var done = this.async();

    var getTaskNames = function(content) {
      var installed = grunt.file.expand('node_modules/*');
      var difference = [];
      var tasksRegex = /(.*)grunt\.loadNpmTasks\(? *['"](.+?)['"] *\)?/g;
      var match = tasksRegex.exec(content);
      while (match !== null) {
        if (match[1].search(/\/\/|#|\/\*/) < 0) { // Filter out commented.
          var name = match[2];
          if (installed.indexOf('node_modules/'+name) < 0) {
            difference.push(name);
          }
        }
        match = tasksRegex.exec(content);
      }
      return difference;
    };

    var processFile = function(contents) {
      var difference = getTaskNames(contents);
      if (difference.length === 0) {
        done(true);
        return;
      }

      grunt.log.writeln("Installing " + difference.length + " packages:");

      var workers = {count: difference.length, error: false};

      var workerFinished = function() {
        if (--workers.count === 0) {
          done(!workers.error);
        }
      };

      var installPackage = function(name) {
        grunt.util.spawn({
          cmd: 'npm',
          args: ["install", name, "--save-dev"]
        }, function(error) {
            if (error !== null) {
              grunt.log.error("[ X ] "+name);
              workers.error = true;
              workerFinished();
            } else {
              grunt.log.ok("[ √ ] "+name);
            }
        });
      };

      difference.forEach(installPackage);
    };

    var filenames = [];
    var gruntNames = grunt.file.expand('Gruntfile.*');
    if (!gruntNames) {
      gruntNames = grunt.file.expand('grunt.*');
    }
    if (this.files !== undefined) {
      filenames = this.filesSrc;
    }
    Array.prototype.push.apply(filenames, gruntNames);
    var contents = null;
    for (var i = 0; i < filenames.length; i++) {
      var filename = filenames[i];
      contents = grunt.file.read(filename, {encoding: 'utf8'});
      if (contents) {
        processFile(contents);
        break;
      }
    }
    if (!contents) {
      done(true);
    }

  });

};
