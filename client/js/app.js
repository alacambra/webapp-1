define(['marionette',
        'config',
        'i18n'],
function(Marionette, CONFIG) {
    var App = new Marionette.Application();


    App.addRegions({
        navi_region: '#navi-region',
        main_region: '#main-region'
    });


    App.init_i18n = function(callback) {
        callback = callback || function() {};

        I18n.defaultLocale = CONFIG.i18n.default_locale;

        // set locale by session or browser default if no session is available
        var stored_locale = localStorage.getItem('locale');
        var browser_locale = window.navigator.language.split('-')[0].toLowerCase();
        I18n.locale = stored_locale || browser_locale;

        // use default language if unknown language is requested
        if (_.indexOf(CONFIG.i18n.available_locales, I18n.locale) == -1) I18n.locale = I18n.defaultLocale;

        require(['locales/' + I18n.locale], callback); // load translation file, run callback afterwards
    };


    App.show_version = function() {
        if (!_.isUndefined(CONFIG.version)) {
            $('body').append('<div id="version-footer">' + CONFIG.version + '</div>');
        }
    };


    App.show_main_navi = function() {
        require(['app/common/main_navi_view'], function(MainNaviView) {
            var navi_view = new MainNaviView({
                available_locales: CONFIG.i18n.available_locales
            });

            App.navi_region.show(navi_view);
        });
    };


    App.navigate = function(route,  options) {
        options = options || {};
        Backbone.history.navigate(route, options);
    };


    App.current_route = function() {
        return Backbone.history.fragment;
    };


    App.model_base_url = function(model, parent_model, parent_id) {
        var parent_base_url = '';
        var cfg = CONFIG.rest.base_url.default;

        if (CONFIG.rest.base_url_switch_by_subdomain) {
            var subdomain = document.location.host.split('.')[0];
            cfg = CONFIG.rest.base_url[subdomain] || cfg;
        }

        if (!_.isUndefined(parent_model)) {
            parent_base_url = parent_model + '/' + parent_id + '/';
        }

        return cfg + '/' + parent_base_url + model;
    };


    App.handle_link = function(event) {
        event.preventDefault();
        event.stopPropagation();

        var target = $(event.currentTarget).attr('data-navigate').split(',');
        var params = target.slice(1); // all params, except of first
        target = target[0]; // first param

        //console.log(target + ' - ' + params.join(', '));

        // Tries to keep the usual cases speedy (inspired by Backbone.triggerEvents)
        switch(params.length) {
            case 0: App.trigger(target); break;
            case 1: App.trigger(target, params[0]); break;
            case 2: App.trigger(target, params[0], params[1]); break;
            case 3: App.trigger(target, params[0], params[1], params[2]); break;
            default: App.trigger(target, params);
        }
    };


    App.path = {};
    App.path['home'] = function() { return {
        href: '#',
        event: 'home'
    }};


    App.on('home', function () {
        App.navigate('#');
        require(['app/common/home_view'], function (HomeView) {
            App.main_region.show(new HomeView());
        });
    });


    App.on('initialize:after', function() {
        App.init_i18n(function() {
            var faux_require = CONFIG.rest.faux.enable ? 'app_faux_server' : '';

            require([
                faux_require,
                'app/user_sessions/user_sessions_app',
                'app/efforts/efforts_app',
                'app/projects/projects_app',
                'app/services/services_app',
                'app/tasks/tasks_app',
                'app/users/users_app',
                'app/common/loading_view',
                'app/common/home_view'
            ], function() {
                App.show_version();
                App.show_main_navi();

                Backbone.history.start();

                if (is_blank(App.current_route())) {
                    App.trigger('home');
                }
            });
        });
    });


    return App;
});
