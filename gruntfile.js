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
                        src: ['node_modules/animate.css/animate.min.css'],
                        rename: function () {
                            return 'dist/css/animate.css';
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