module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      dev: {
        options: {
          script: 'app.js'
        }
      }
    },
    watch: {
      scripts: {
        files: ['*'],
        tasks: ['default'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express', 'watch'])
};
