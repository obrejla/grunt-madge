/*
 * grunt-madge
 * https://github.com/pahen/grunt-madge
 *
 * Copyright (c) 2013 Patrik Henningsson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var madge = require('madge');

    grunt.registerMultiTask('madge', 'Check for circular dependencies in modules.', function () {

        grunt.log.write('Checking ' + this.filesSrc.join(', ') + '...');

        var done = this.async();

        // run madge on the given files/dirs
        madge(this.filesSrc, this.options()).then(function (res) {
            var circular = res.circular();

            // check if madge found any circular dependencies
            if (circular.length) {
                grunt.log.error();

                // show a list of circular dependencies
                circular.forEach(function (path) {
                    path.forEach(function (module, idx) {
                        if (idx) {
                            grunt.log.write(' -> '.cyan);
                        }
                        grunt.log.write(module.red);
                    });
                    grunt.log.writeln('');
                });

                grunt.log.warn('Circular dependencies found.');
                done({message: 'Circular dependencies found.'});
            } else {
                // print a success message
                grunt.log.ok();
                done();
            }
        });
    });
};