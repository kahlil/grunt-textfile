/*
 * grunt-textfile
 * https://github.com/kahlil/grunt-textfile
 *
 * Copyright (c) 2013 Kahlil Lechelt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var textfile = require('./lib/textfile').init(grunt);

  grunt.registerMultiTask('textfile', 'Create a new post for your text file based blogging software.', function() {
    var options, template, filename;
    // Merge task-specific and/or target-specific options with these defaults.
    options = this.options({
      // Name of the default template.
      template: 'example.tpl',
      // Directory containing the templates.
      templateDir: 'templates',
      // Destination for the generated file.
      dest: 'tmp',
      // URL format for the DATE keyword in urlFormat.
      urlDateFormat: 'yyyy-mm-dd',
      // The template for the filename or directory name of the file.
      urlFormat: 'PREFIX-SLUG/article.link.txt',
    });

    // Process the urlFormat option. Replaces the keywords
    // PREFIX, SLUG and DATE in options.urlFormat.
    filename = textfile.processUrlFormat(options);

    // Get the template name from the task options.
    // Check if the file exists.
    var filePath = './' + options.templateDir + '/' + options.template;
    if (!grunt.file.exists(filePath)) {
      grunt.log.warn('Template file "' + filePath + '" not found.');
      return false;
    } else {
      template = grunt.file.read(filePath);
    }

    // Process the the template file.
    var result   = grunt.util.normalizelf(grunt.template.process(template));
    var fullPath = options.dest + '/' + filename;
    grunt.file.write(fullPath, result);
    grunt.log.writeln('File "' + fullPath  + '" created.');
  });

};
