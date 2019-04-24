module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['sass']
            },
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: ['uglify']
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            src: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '**/*.js',
                        dest: 'dist/js',
                        ext: '.js'
                    }
                ]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: [{expand: true, cwd: 'src/scss', src: '**/*.scss', dest: 'dist/css', ext: '.css'}]
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['node_modules/jquery/dist/jquery.min.js'],
                        rename: function () {
                            return 'dist/js/jquery.js';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/bootstrap/dist/js/bootstrap.min.js'],
                        rename: function () {
                            return 'dist/js/bootstrap.js';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/animate.css/animate.min.css'],
                        rename: function () {
                            return 'dist/css/animate.css';
                        }
                    },
                    {
                        expand: true, cwd: 'node_modules/@fortawesome/fontawesome-free/webfonts/', src: '**', dest: 'dist/fonts/'
                    },
                    {
                        expand: true, cwd: 'node_modules/@fortawesome/fontawesome-free/scss/', src: ['**', '!fontawesome.scss','!brands.scss','!regular.scss','!solid.scss','!v4-shims.scss'], dest: 'src/scss/fontawesome/'
                    },
                    {
                        expand: true,
                        src: ['node_modules/@fortawesome/fontawesome-free/scss/v4-shims.scss'],
                        rename: function () {
                            return 'src/scss/fontawesome/_v4-shims.scss';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/@fortawesome/fontawesome-free/scss/brands.scss'],
                        rename: function () {
                            return 'src/scss/fontawesome/_brands.scss';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss'],
                        rename: function () {
                            return 'src/scss/fontawesome/_fontawesome.scss';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/@fortawesome/fontawesome-free/scss/regular.scss'],
                        rename: function () {
                            return 'src/scss/fontawesome/_regular.scss';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/@fortawesome/fontawesome-free/scss/solid.scss'],
                        rename: function () {
                            return 'src/scss/fontawesome/_solid.scss';
                        }
                    },
                    {
                        expand: true, cwd: 'node_modules/bootstrap/scss/', src: ['**', '!bootstrap-grid.scss', '!bootstrap-reboot.scss', '!bootstrap.scss'], dest: 'src/scss/bootstrap/'
                    },
                    {
                        expand: true,
                        src: ['node_modules/bootstrap/scss/bootstrap-grid.scss'],
                        rename: function () {
                            return 'src/scss/bootstrap/_bootstrap-grid.scss';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/bootstrap/scss/bootstrap-reboot.scss'],
                        rename: function () {
                            return 'src/scss/bootstrap/_bootstrap-reboot.scss';
                        }
                    },
                    {
                        expand: true,
                        src: ['node_modules/bootstrap/scss/bootstrap.scss'],
                        rename: function () {
                            return 'src/scss/bootstrap/_bootstrap.scss';
                        }
                    }
                ],
            },
        },
        connect: {
            server: {
                options: {
                    port: 4200,
                    base: './',
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('serve', ['connect:server','watch']);
    grunt.registerTask('actualizar', ['copy', 'sass', 'uglify']);
};