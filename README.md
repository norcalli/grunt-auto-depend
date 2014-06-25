# grunt-auto-depend

> Auto install grunt dependencies from grunt.loadNpmTasks as you program so that you can be even lazier.

## Getting Started
This plugin requires Grunt `~0.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-auto-depend --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-auto-depend');
```

## The "auto_install" task

### Overview
In your project's Gruntfile, you can use the task named `auto_depend` anywhere. I use it in my `watch` task when my `Gruntfile` is changed.

grunt.task.run('auto_depend');


### Options

#### options.separator
Type: `String`
Default value: `',  '`

A string value that is used to do something with whatever.

#### options.punctuation
Type: `String`
Default value: `'.'`

A string value that is used to do something else with whatever else.

### Usage Examples

A simple task is registered by the name of `auto_depend`, which when invoke will
 automatically find your `Gruntfile` and install everything _that is not commented out_.
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
