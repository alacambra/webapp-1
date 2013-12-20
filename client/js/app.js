define(['marionette', 'config'], function(Marionette, CONFIG){
    var App = new Marionette.Application();


    App.addRegions({
        navi_region: '#navi-region',
        main_region: '#main-region'
    });


    App.init_i18n = function() {
        I18n.defaultLocale = CONFIG.i18n.default_locale;

        // set locale by session or browser default if no session is available
        var stored_locale = localStorage.getItem('locale');
        var browser_locale = window.navigator.language.split('-')[0].toLowerCase();
        I18n.locale = stored_locale || browser_locale;

        // use default language if unknown language is requested
        if (_.indexOf(CONFIG.i18n.available_locales, I18n.locale) == -1) I18n.locale = I18n.defaultLocale;

        require(['locales/' + I18n.locale]); // load translation file
    };


    App.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    App.current_route = function(){
        return Backbone.history.fragment;
    };

    App.model_base_url = function(model) {
        var cfg = CONFIG.rest.base_url.default;

        if (CONFIG.rest.base_url_switch_by_subdomain) {
            var subdomain = document.location.host.split('.')[0];
            cfg = CONFIG.rest.base_url[subdomain] || cfg;
        }

        return cfg.url + '/' + model + (cfg.pluralized !== false ? 's' : '');
    };

    App.on('initialize:after', function(){
        if (Backbone.history) {
            require(['app/tasks/tasks_app'], function () {
                Backbone.history.start();

                if (App.current_route() === '') {
                    App.trigger('tasks:list');
                }
            });
        }

        App.init_i18n();

        require(['app/common/main_navi_view'], function (MainNaviView) {
            var navi_view = new MainNaviView({
                available_locales: CONFIG.i18n.available_locales
            });

            App.navi_region.show(navi_view);
        });

    });


    return App;
});
