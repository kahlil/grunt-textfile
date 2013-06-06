'use strict';

var grunt    = require('grunt');
var textfile = require('../tasks/lib/textfile').init(grunt);

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.textfile = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  processUrlFormat: function(test) {
    var actual, expected, dataSet;
    dataSet = {
      template: 'example.tpl',
      templateDir: 'templates',
      dest: 'tmp',
      urlDateFormat: 'yyyy-mm-dd',
      urlFormat: 'PREFIX-SLUG/article.link.txt'
    };

    grunt.option('title', 'This is the title');

    test.expect(2);

    actual   = textfile.processUrlFormat(dataSet);
    expected = '1-this-is-the-title/article.link.txt';
    test.equal(actual, expected, 'Should generate the right filepath.');

    dataSet.urlFormat = 'DATE-SLUG.md';

    actual   = textfile.processUrlFormat(dataSet);
    expected = grunt.template.today(dataSet.urlDateFormat) + '-this-is-the-title.md';
    test.equal(actual, expected, 'Should generate the right filepath.');

    test.done();
  },
  default_options: function(test) {
    var actual, expected;
    test.expect(1);

    grunt.util.spawn({
      grunt: true,
      args: ['textfile:linkpost', '--link=http://thisisthelink.com', '--title=This is the title']
    }, function() {
      actual   = grunt.file.read('tmp/1-this-is-the-title/article.link.txt');
      expected = grunt.file.read('test/expected/article.link.txt');
      test.equal(actual, expected, 'should generate the correct file.');

      test.done();
    });
  }
};
