module.exports = function(config) {
  config.set({
    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/momentjs/moment.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpl.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap.js',
      'app/scripts/filters/filters.js',
      'app/scripts/services/api.js',
      'app/scripts/services/data.js',
      'app/scripts/services/load_status.js',
      'app/scripts/controllers/confirm_modal.js',
      'test/**/*.spec.js'
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
