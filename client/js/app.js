define(['marionette', 'config', 'i18n'], function(Marionette, CONFIG){
    var App = new Marionette.Application();


    App.addRegions({
        navi_region: '#navi-region',
        main_region: '#main-region'
    });


    App.init_i18n = function(callback) {
        if (callback === undefined) callback = function() {};

        I18n.defaultLocale = CONFIG.i18n.default_locale;

        // set locale by session or browser default if no session is available
        var stored_locale = localStorage.getItem('locale');
        var browser_locale = window.navigator.language.split('-')[0].toLowerCase();
        I18n.locale = stored_locale || browser_locale;

        // use default language if unknown language is requested
        if (_.indexOf(CONFIG.i18n.available_locales, I18n.locale) == -1) I18n.locale = I18n.defaultLocale;

        require(['locales/' + I18n.locale], callback); // load translation file, run callback afterwards
    };


    App.show_main_navi= function() {
        require(['app/common/main_navi_view'], function (MainNaviView) {
            var navi_view = new MainNaviView({
                available_locales: CONFIG.i18n.available_locales
            });

            App.navi_region.show(navi_view);
        });
    };


    App.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };


    App.current_route = function(){
        return Backbone.history.fragment;
    };


    App.model_base_url = function(model, parent_model, parent_id) {
        var parent_base_url = '';
        var cfg = CONFIG.rest.base_url.default;

        if (CONFIG.rest.base_url_switch_by_subdomain) {
            var subdomain = document.location.host.split('.')[0];
            cfg = CONFIG.rest.base_url[subdomain] || cfg;
        }

        if (parent_model !== undefined) {
            parent_base_url = parent_model + '/' + parent_id + '/';
        }

        return cfg + '/' + parent_base_url + model;
    };


    App.on('initialize:after', function(){
        App.init_i18n(function() {
            App.show_main_navi();

            require([
                'app/user_sessions/user_sessions_app',
                'app/efforts/efforts_app',
                'app/projects/projects_app',
                'app/tasks/tasks_app',
                'app/users/users_app'
            ], function () {
                Backbone.history.start();

                if (App.current_route() === '') {
                    App.trigger('tasks:list');
                }
            });
        });
    });


    return App;
});
