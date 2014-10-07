/*global module:false*/
module.exports = function(grunt) {

  /*** set up vars. */
  var env = process.env.NODE_ENV || 'dev';
  var appconfig = require(process.cwd() + '/app/config/app')[env];
  var jshintrc = JSON.parse(require('fs').readFileSync('./.jshintrc', 'utf8'));
  // delete unsupported options from jshint version in Plato
  // @TODO: submit a pull request to update the included version of Plato
  delete jshintrc.freeze;
  delete jshintrc.nonbsp;


  /*** Project configuration. */
  grunt.initConfig({

    /*** configuration options. */
    config: {
      files: {
        gruntfile: 'Gruntfile.js',
        app: 'app/{,**/}*.js',
        tests: 'spec/{,**/}*.js',
        unittests: 'spec/unit/{,**/}*.js',
        integration: 'spec/integration/{,**/}*.js',
        reportsdir: 'reports'
      },
      node: appconfig,
      jshintrc: jshintrc
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
        command: './node_modules/.bin/nodemon ./app/server.js'
      },
      test: {
        options: {
          stdout: true
        },
        command: './node_modules/istanbul/lib/cli.js test ./node_modules/jasmine-node/bin/jasmine-node -- ' +
            'spec/unit/ --color --growl'
      },
      cover: {
        command: './node_modules/istanbul/lib/cli.js cover --dir <%= config.files.reportsdir %>/coverage ' +
            './node_modules/jasmine-node/bin/jasmine-node -- spec/unit/'
      },
      checkcoverage: {
        command: './node_modules/istanbul/lib/cli.js check-coverage --statement 99 --branch 75 ' +
            '--function 75 --lines 100'
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
      all: ['spec/'],
      unit: ['spec/unit/'],
      integration: ['spec/integration/']
    },

    /*** JS Syntax checking. */
    jshint: {
      options: '<%= config.jshintrc %>',
      gruntfile: {
        src: '<%= config.files.gruntfile %>'
      },
      app: {
        src: ['<%= config.files.app %>']
      },
      spec: {
        options: {
          globals: {
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
          src:['<%= config.files.app %>']
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
        jsLintXML: '<%= config.files.reportsdir %>/complexity/report.xml',
        checkstyleXML: '<%= config.files.reportsdir %>/complexity/checkstyle.xml',
        errorsOnly: false,               // show only maintainability errors
        cyclomatic: 10,          // 10 - 15 is a good range
        halstead: 50,            // 50 - 60 is a good range
        maintainability: 50,
        hideComplexFunctions: false,     // only display maintainability
        broadcast: false,                 // broadcast data over event-bus
        n: true
      },
      app: {
        src: ['<%= config.files.app %>']
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
          '<%= config.files.reportsdir %>/plato': ['<%= complexity.app.src %>']
        }
      }
    },

    /*** Clean directories. */
    clean: {
      reports: ['<%= config.files.reportsdir %>'],
      coverage: ['<%= config.files.reportsdir %>/coverage'],
      complexity: ['<%= config.files.reportsdir %>/complexity'],
      plato: ['<%= config.files.reportsdir %>/plato']
    },

    /*** handle changes in files. */
    watch: {
      hint: {
        files: [
          '<%= config.files.gruntfile %>',
          '<%= config.files.app %>',
          '<%= config.files.unittests %>'
        ],
        tasks: ['jshint']
      },
      test: {
        files: [
          '<%= config.files.app %>',
          '<%= config.files.tests %>'
        ],
        tasks: ['test']
      },
      unittest: {
        files: [
          '<%= config.files.app %>',
          '<%= config.files.unittests %>'
        ],
        tasks: ['jasmine_node']
      }
    }

  });


  /*** Load the plugins. */
  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('grunt-contrib-clean');
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

  // start the application and open postman.
  grunt.registerTask('serve', ['test', 'start']);

  // Test scripts.
  grunt.registerTask('test', ['clean:coverage', 'clean:complexity', 'jshint', 'jsvalidate', 'jasmine_node',
      'shell:cover', 'shell:checkcoverage', 'complexity' ]);

  // Coverage checking scripts.
  grunt.registerTask('cover', ['clean:coverage', 'shell:test', 'shell:cover', 'shell:checkcoverage']);

  // check the overall app quality.
  grunt.registerTask('report', ['clean:reports', 'plato', 'shell:cover', 'complexity']);

};
