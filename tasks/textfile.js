/*
 * grunt-textfile
 * https://github.com/kahlil/grunt-textfile
 *
 * Copyright (c) 2013 Kahlil Lechelt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var textfile = require('./lib/textfile').init(grunt);
  var _s       = require('underscore.string');

  grunt.registerMultiTask('textfile', 'Create a new post for your textfile based blogging software.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var template = grunt.file.read('./templates/kirby-linkpost.tpl');
    var tplopt   = {
        title: grunt.option('title'),
        link: grunt.option('link')
    };
    var result   = grunt.template.process(template, {data: tplopt});
    console.log(result);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));

      // Handle options.
      src += options.punctuation;

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
