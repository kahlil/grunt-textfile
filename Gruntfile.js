/*
 * grunt-textfile
 * https://github.com/kahlil/grunt-textfile
 *
 * Copyright (c) 2013 Kahlil Lechelt
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    textfile: {
      options: {
        // The path to the folder containing the articles
        dest: 'tmp',
      },
      linkpost: {
        options: {
            // The name of the template
            template: 'kirby-linkpost.tpl',
            // Create the desired URIs. Kirby needs something like
            // 045-this-is-the-slug/article.txt
            // where the number in the beginning signifies the
            // order of the articles.
            // In Jekyll the format could look like this:
            // 2013-06-05-this-is-the-slug.md.
            // The urlFormat option for that case would look like this:
            // urlFormat: 'DATE-SLUG.md'
            // We have 3 key words at our disposal: PREFIX, DATE and SLUG.
            // PREFIX prepends an ascending number at the beginning of the dir name.
            // If you use DATE the format 'yyyy-mm-dd' is used by default,
            // you can customize that with the option
            // urlDateFormat: 'yyyy-mm'
            urlFormat: 'PREFIX-SLUG/article.link.txt'
        }
      },
      article: {
        options: {
            template: 'kirby-article.tpl',
            urlFormat: 'PREFIX-SLUG/article.txt'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
