module.exports = function(config) {
  config.set({
    files : [
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-cookies/angular-cookies.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/momentjs/moment.js',
      'app/bower_components/stampit/dist/stampit.js',
      'app/scripts/app.js',
      'app/scripts/models/models.js',
      'app/scripts/models/models_service.js',
      'app/scripts/models/stamps.js',
      'app/scripts/services/api.js',
      'app/scripts/services/data.js',
      'app/scripts/services/load_status.js',
      'app/scripts/services/session.js',
      'app/scripts/services/base64.js',
      'app/scripts/directives/directives.js',
      'app/scripts/filters/filters.js',
      'app/scripts/controllers/nav.js',
      'app/scripts/controllers/users.js',
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
