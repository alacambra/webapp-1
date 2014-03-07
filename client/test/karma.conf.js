module.exports = function(config) {
  config.set({
    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/momentjs/moment.js',
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/sass-bootstrap/dist/js/bootstrap.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.js',
      'app/bower_components/stampit/dist/stampit.js',
      'app/scripts/**/*.js',
      'test/**/*.js'
    ],
    basePath: '../',
    frameworks: ['jasmine'],
    reporters: ['progress'],
    browsers: ['Firefox'],
    autoWatch: true,
    singleRun: false,
    colors: true
  });
};