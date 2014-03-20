module.exports = function(config) {
  config.set({
    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/momentjs/moment.js',
      'app/scripts/filters/filters.js',
      'test/**/*spec.js'
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
