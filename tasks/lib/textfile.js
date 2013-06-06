/*
 * grunt-textfile
 * https://github.com/kahlil/grunt-textfile
 *
 * Copyright (c) 2013 Kahlil Lechelt
 * Licensed under the MIT license.
 */

'use strict';

exports.init = function(grunt) {

  var exports = {};
  var S       = require('string');

  // Process the urlFormat option
  exports.processUrlFormat = function(options) {
    var dirs, sFilename;

    // Check if the url format variable contains PREFIX
    sFilename = S(options.urlFormat);
    if(sFilename.contains('PREFIX')) {
      dirs      = grunt.file.expand({filter: 'isDirectory'}, options.dest + '/*');
      sFilename = sFilename.replaceAll('PREFIX', dirs.length + 1);
    }
    if(sFilename.contains('SLUG')) {
      sFilename = sFilename.replaceAll('SLUG', S(grunt.option('title')).slugify());
    }
    if(sFilename.contains('DATE')) {
      sFilename = sFilename.replaceAll('DATE', grunt.template.today(options.urlDateFormat));
    }

    return sFilename.s;
  };

  return exports;
};