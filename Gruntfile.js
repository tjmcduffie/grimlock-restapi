/*global module:false*/
module.exports = function(grunt) {

  /*** set up vars. */
  var env = process.env.NODE_ENV || 'dev';
  var appconfig = require(process.cwd() + '/config/app')[env];


  /*** Project configuration. */
  grunt.initConfig({

    /*** configuration options. */
    config: {
      files: {
        gruntfile: 'Gruntfile.js',
        appentry: 'server.js',
        app: '{controllers,lib,models}/{,**/}*.js',
        tests: 'spec/{,**/}*.js'
      },
      node: appconfig
    },

    /*** Open task. */
    open: {
      /*** This fails to open. System thinks its a file and throws an error */
      // postman: {
      //   path: 'chrome-extension://fdmmgilgnpjigdojojpjoooidkmcomcm/index.html',
      //   app: 'Google Chrome'
      // }
    },

    /*** Shell commands. */
    shell: {
      mongostart: {
        options: {
          stdout: true
        },
        command: '/usr/local/bin/mongod --config db/mongo.conf;'
      },
      mongostop: {
        options: {
          stdout: true
        },
        command: '/usr/local/bin/mongo --eval "db.getSiblingDB(\'admin\').shutdownServer()";'
      },
      appstart: {
        options: {
          stdout: true
        },
        command: './node_modules/.bin/nodemon ./server.js'
      },
      test: {
        options: {
          stdout: true
        },
        command: './node_modules/istanbul/lib/cli.js test ./node_modules/jasmine-node/bin/jasmine-node -- ' +
            'spec/ --color --growl'
      },
      cover: {
        options: {
          stdout: true
        },
        command: './node_modules/istanbul/lib/cli.js cover --dir reports/coverage ' +
            './node_modules/jasmine-node/bin/jasmine-node -- spec/'
      },
      checkcoverage: {
        command: './node_modules/istanbul/lib/cli.js check-coverage --statement 90 --branch 90 ' +
            '--function 100 --lines 90'
      }
    },

    /*** Unit tests. Use the grunt task instead of the shell command to
         keep things Gruntified. The shell commands are aliases to the NPM
         scripts to allow for additional args without Grunt interpretation. */
    jasmine_node: {
      options: {
        verbose: false,
        growl: true
      },
      all: ['spec/']
    },

    /*** JS Syntax checking. */
    jshint: {
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        es3: true,
        forin: true,
        freeze: true,
        immed: true,
        latedef: 'nofunc',
        newcap: true,
        noarg: true,
        node: true,
        noempty: true,
        nonbsp: true,
        quotmark: 'single',
        undef: true,
        trailing: true,
        maxparams: 4,
        maxcomplexity: 10,
        maxlen: 110,
        unused: 'strict',
        validthis: true
      },
      gruntfile: {
        options: {
          force: true
        },
        src: '<%= config.files.gruntfile %>'
      },
      app: {
        options: {
          force: true
        },
        src: ['<%= config.files.appentry %>', '<%= config.files.app %>']
      },
      spec: {
        options: {
          globals: {
            force: true,
            afterEach: true,
            beforeEach: true,
            describe: true,
            expect: true,
            it: true,
            jasmine: true,
            spyOn: true,
            xdescribe: true,
            xit: true
          }
        },
        src: '<%= config.files.tests %>'
      }
    },

    jsvalidate: {
      options:{
        globals: {},
        esprimaOptions: {},
        verbose: false
      },
      gruntfile:{
        files:{
          src:['<%= config.files.gruntfile %>']
        }
      },
      app:{
        files:{
          src:['<%= config.files.appentry %>', '<%= config.files.app %>']
        }
      },
      spec: {
        files:{
          src:['<%= config.files.tests %>']
        }
      }
    },

    /*
     * Measures for cyclomatic and halstead complexity were taken from a number
     * of sources:
     *   http://www.mccabe.com/pdf/MeasuringSoftwareComplexityUAV.pdf p4
     *   http://www.sei.cmu.edu/reports/97hb001.pdf p147
     *   http://www.cs.cmu.edu/Groups/software-eng/SERG/spring-97/24-feb-97/24-feb-97-slides.pdf p4
     *   http://www.mountaingoatsoftware.com/articles/a-measured-response
     *   http://www.mccabe.com/pdf/McCabeCodeQualityMetrics-OutsourcedDev.pdf p11
     *   http://blogs.msdn.com/b/zainnab/archive/2011/05/26/code-metrics-maintainability-index.aspx
     *       ?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+zainnab+(Visual+Studio+Tips
     *       +and+Tricks)
     *       for microsoft maintainability index
     */
    complexity: {
      options: {
        breakOnErrors: true,
        jsLintXML: 'reports/complexity/report.xml',         // create XML JSLint-like report
        checkstyleXML: 'reports/complexity/checkstyle.xml', // create checkstyle report
        errorsOnly: false,               // show only maintainability errors
        cyclomatic: 10,          // 10 - 15 is a good range
        halstead: 50,            // 50 - 60 is a good range
        maintainability: 50,
        hideComplexFunctions: false,     // only display maintainability
        broadcast: false,                 // broadcast data over event-bus
        n: true
      },
      app: {
        src: [
          '<%= config.files.appentry %>',
          '<%= config.files.app %>'
          // 'lib/*.js'
        ]
      }
    },

    plato: {
      options: {
        jshint: '<%= jshint.options %>',
        complexity: {
          minmi: '<%= complexity.options.maintainability %>',
          maxcyc: '<%= complexity.options.cyclomatic %>',
          maxcycden: 0.42,
          maxhd: '<%= complexity.options.halstead %>',
          maxhv: 1500,
          maxhe: 300,
          logicalor: false,
          switchcase: false,
          forin: true,
          trycatch: true,
          newmi: true
        },
        q: false,
        title: '<%= config.node.name %>'
      },
      app: {
        files: {
          // 'reports/plato': ['<%= config.files.appentry %>', '<%= config.files.app %>']
          'reports/plato': ['<%= complexity.app.src %>']
        }
      }
    },

    /*** handle changes in files. */
    watch: {
      hint: {
        files: [
          '<%= config.files.gruntfile %>',
          '<%= config.files.appentry %>',
          '<%= config.files.app %>',
          '<%= config.files.tests %>'
        ],
        tasks: ['jshint']
      },
      test: {
        files: [
          '<%= config.files.appentry %>',
          '<%= config.files.app %>',
          '<%= config.files.tests %>'
        ],
        tasks: ['test']
      }
    }

  });


  /*** Load the plugins. */
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-jsvalidate');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-shell');


  /*** Create task aliases. */
  // Default task.
  grunt.registerTask('default', ['serve']);

  // Start the application.
  grunt.registerTask('start', ['shell:mongostart', 'shell:appstart']);

  // stop related services.
  grunt.registerTask('stop', ['shell:mongostop']);

  // Test scripts.
  grunt.registerTask('test', ['jasmine_node']);

  // Test scripts.
  grunt.registerTask('coverage', ['shell:test', 'shell:cover', 'shell:checkcoverage']);

  // start the application and open postman.
  grunt.registerTask('serve', ['test', 'start']);

  // check the overall app quality.
  grunt.registerTask('quality', ['jshint', 'jsvalidate', 'complexity', 'plato', 'coverage']);

};
