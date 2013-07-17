# grunt-textfile

![grunt-textfile](https://raw.github.com/kahlil/grunt-textfile/master/grunt-textfile.jpg)

> A grunt task to quickly create text files for text file based blogging.

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
      dest: 'content/blog',
      openFile: true
    },
    linkpost: {
      options: {
        template: 'kirby-linkpost.tpl',
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

#### Templates

Store your templates in the templates folder and use the [`grunt.template`](http://gruntjs.com/api/grunt.template) and the [`grunt.option`](http://gruntjs.com/api/grunt.option) API for placeholders.

Example template: 

```
Title: <%= grunt.option('title') %>
----
Link: <%= grunt.option('link') %>
----
Date: <%= grunt.template.today('yyyy-mm-dd') %>
----
Author: Jean-Luc Picard
----
Text:
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

#### options.urlDateFormat
In case you need to use the date the name of the generated file, you can change the format with this option.  
Type: `String`  
Default value: `'yyyy-mm-dd'`  

#### options.urlFormat
Type: `String`  
Default Value: 'PREFIX-SLUG/article.link.txt'  

This option lets you set the desired formatting of the filename. There are 3 keywords you can use in here: 

```
// PREFIX is needed for Kirby blogs. It prepends an ascending number to the folder name 
// of the folder containing your textfile
'PREFIX' 
// This keyword is replaced by the slug generated with the title
'SLUG'
// This keyword is replaced by the date of today 
// formatted via options.urlDateFormat
'DATE'
```

#### options.openFile
Specify if you want the generated file to opened in an editor.  
Type: `Boolean`  
Default Value: `false`

#### options.openWith
Specify which editor you want the generated file to be opened with.  
Type: `String`  
Default Value: `subl`

### Usage Examples

#### Kirby Link Post

##### Gruntfile: 
```js
grunt.initConfig({
  textfile: {
    options: {
      dest: 'content/blog',
      openFile: true
    },
    linkpost: {
      options: {
        template: 'kirby-linkpost.tpl',
        urlFormat: 'PREFIX-SLUG/article.link.txt'
      }
    }
  },
})
```

##### Template: 

```
Title: <%= grunt.option('title') %>
----
Link: <%= grunt.option('link') %>
----
Date: <%= grunt.template.today('yyyy-mm-dd') %>
----
Author: kahlil-lechelt
----
Text:
```

##### Call:
```bash
grunt textfile --link="http://thisisalink.net" --title="This is a title"
``` 

#### Jekyll Post

##### Gruntfile: 
```js
grunt.initConfig({
  textfile: {
    options: {
      dest: '_posts',
      openFile: true
    },
    article: {
      options: {
        template: 'jekyll-article.tpl',
        urlFormat: 'DATE-SLUG.md'
      }
    }
  },
})
```

##### Template: 

```Handlebars
---
Title: <%= grunt.option('title') %>
Date: <%= grunt.template.today('yyyy-mm-dd') %>
Author: kahlil-lechelt
---
```

##### Call:
```bash
grunt textfile --title="This is a title"
``` 

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

To run the tests clone this repo, do `npm install` and then `grunt`.

## Release History
Only releases with bigger changes will be listed here. Not listed are minor releases only containing small fixes and clean up.
```
v0.1.7: add 'openFile' and 'openFile' options to open the generated file in an editor.
v0.1.0: initial release.
```

### Cool Badge

[![NPM](https://nodei.co/npm/grunt-textfile.png)](https://nodei.co/npm/grunt-textfile/)
