# grunt-textfile

> A grunt task to create text files for text-based CMS and static file generators.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-textfile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-textfile');
```

## The "textfile" task

### Overview
In your project's Gruntfile, add a section named `textfile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
  }
})
```

### Options

#### options.template
Type: `String`
Default value: `'example.tpl'`

#### options.templateDir
Type: `String`
Default value: `'templates'`

#### options.templateDir
Destination for the generated file. Needs to be set to the folder in which your text files are stored.

Type: `String`
Default value: `'tmp'`


// URL format for the DATE keyword in urlFormat.
urlDateFormat: 'yyyy-mm-dd',
// The template for the filename or directory name of the file.
urlFormat: 'PREFIX-SLUG/article.link.txt',

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  textfile: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  textfile: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
