/*
 * grunt-auto-install
 * https://github.com/norcalli/grunt-auto-install
 *
 * Copyright (c) 2014 Ashkan Kiani
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['auto_depend']);
};
