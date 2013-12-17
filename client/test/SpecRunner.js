require.config({
    baseUrl: '../js/',
    urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery: 'lib/vendor/jquery',
        underscore: 'lib/vendor/underscore',
        backbone: 'lib/vendor/backbone',
        backbone_syphon: 'lib/vendor/backbone.syphon',
        bootstrap: 'lib/vendor/bootstrap',
        marionette: 'lib/vendor/backbone.marionette',
        moment: 'lib/vendor/moment',
        tpl: 'lib/vendor/tpl',
        advanced_string: 'lib/advanced_string',
        behaviour: 'lib/behaviour',
        jasmine: '../test/lib/jasmine/jasmine',
        'jasmine-html': '../test/lib/jasmine/jasmine-html',
        spec: '../test/spec'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [ 'underscore', 'jquery' ],
            exports: 'Backbone'
        },
        backbone_syphon: [ 'backbone' ],
        bootstrap: {
            deps: [ 'jquery' ],
            exports: 'Bootstrap'
        },
        marionette: {
            deps: [ 'backbone' ],
            exports: 'Marionette'
        },
        behaviour: {
            deps: [ 'jquery' ],
            exports: 'advanced_string'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: [ 'jasmine' ],
            exports: 'jasmine'
        }
    }
});

require([ 'jasmine-html', 'underscore', 'jquery' ], function (jasmine, _, $) {

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/app.spec');
    specs.push('spec/app/entities/task.spec');
    specs.push('spec/app/tasks/task_helper.spec');
    specs.push('spec/app/tasks/edit/edit_controller.spec.js');
    specs.push('spec/app/tasks/list/list_controller.spec.js');
    specs.push('spec/app/tasks/show/show_controller.spec.js');

    $(function () {
        require(specs, function () {
            jasmineEnv.execute();
        });
    });

});