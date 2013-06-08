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
    var options, template, filename, filePath, result, fullPath;
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
      // Set to true if you want the file to be opened in your editor
      openFile: false,
      // Set your fav editor by providing the cli command for you fav editor
      openWith: 'subl'
    });

    // Process the urlFormat option. Replaces the keywords
    // PREFIX, SLUG and DATE in options.urlFormat.
    filename = textfile.processUrlFormat(options);

    // Get the template name from the task options.
    // Check if the file exists.
    filePath = './' + options.templateDir + '/' + options.template;
    if (!grunt.file.exists(filePath)) {
      grunt.log.warn('Template file "' + filePath + '" not found.');
      return false;
    } else {
      template = grunt.file.read(filePath);
    }
    // Process the template file.
    result   = grunt.util.normalizelf(grunt.template.process(template));
    // Put together the full path to the file.
    fullPath = options.dest + '/' + filename;
    // Write the file to specified path.
    grunt.file.write(fullPath, result);
    // Log success!
    grunt.log.writeln('File "' + fullPath  + '" created.');
    // Open file in editor if desired.
    if(options.openFile) {
      grunt.util.spawn({
        cmd: options.openWith,
        args: [fullPath]
      }, function(error, result, code) { grunt.log.error(error); });
    }
  });
};
