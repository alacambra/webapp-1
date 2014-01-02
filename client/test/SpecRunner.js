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
        i18n: 'lib/vendor/i18n',
        jquery_ui: 'lib/vendor/jquery-ui',
        jquery_elastic: 'lib/vendor/jquery-elastic',
        moment: 'lib/vendor/moment',
        textile: 'lib/vendor/textile',
        tpl: 'lib/vendor/tpl',
        advanced_string: 'lib/advanced_string',
        behaviour: 'lib/behaviour',
        tools: 'lib/tools',
        locale_de: 'locales/de',
        locale_en: 'locales/en',
        jasmine: '../test/lib/jasmine/jasmine',
        jasmine_html: '../test/lib/jasmine/jasmine-html',
        spec: '../test/spec',
        backbone_faux_server: 'lib/vendor/backbone-faux-server'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backbone_syphon: ['backbone'],
        backbone_faux_server: {
            deps: ['backbone', 'underscore'],
            exports: 'Faux'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'Bootstrap'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        behaviour: {
            deps: ['jquery'],
            exports: 'advanced_string'
        },
        i18n: { exports: 'I18n' },
        jasmine: {
            exports: 'jasmine'
        },
        jasmine_html: {
            deps: ['jasmine'],
            exports: 'jasmine'
        },

        locale_de: { deps: ['i18n'] },
        locale_en: { deps: ['i18n'] }
    }
});

require(['jasmine_html', 'underscore', 'jquery', 'tools', 'i18n', 'locale_en'], function (jasmine, _, $) {
    I18n.locale = 'en';

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('spec/lib/tools.spec.js');
    specs.push('spec/app/entities/task.spec');
    specs.push('spec/app/app_helper.spec');
    specs.push('spec/app/tasks/tasks_app.spec');
    specs.push('spec/app/tasks/task_helper.spec');
    specs.push('spec/app/tasks/edit/edit_controller.spec.js');
    specs.push('spec/app/tasks/edit/edit_view.spec.js');
    specs.push('spec/app/tasks/list/list_controller.spec.js');
    specs.push('spec/app/tasks/list/list_view.spec.js');
    specs.push('spec/app/tasks/show/show_controller.spec.js');
    specs.push('spec/app/tasks/show/show_view.spec.js');

    $(function () {
        require(specs, function () {
            var original_done = jasmineEnv.currentRunner_.finishCallback;
            jasmineEnv.currentRunner_.finishCallback = function () {
                original_done.call(this);
                if (this.results().failedCount > 0) {
                    alert('Test failed!');
                }
            };

            jasmineEnv.execute();
        });
    });

});