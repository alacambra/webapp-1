define(['marionette', 'config'], function(Marionette, CONFIG){
    var App = new Marionette.Application();


    App.addRegions({
        main_region: '#main-region'
    });


    App.init_i18n = function() {
        I18n.defaultLocale = CONFIG.i18n.default_locale;

        // set locale by session or browser default if no session is available
        if (localStorage.getItem('locale')) {
            I18n.locale = localStorage.getItem('locale');
        } else {
            I18n.locale = window.navigator.language.split('-')[0].toLowerCase(); // user browser accepted language
        }

        // use default language if unknown language is requested
        if (_.indexOf(CONFIG.i18n.available_locales, I18n.locale) == -1) I18n.locale = I18n.defaultLocale;

        require(['locales/' + I18n.locale]); // load translation file

        // TODO: move this into titlebar view js
        $(function() {
            $('#js-locale-current').text(I18n.locale.toUpperCase());

            $('#js-locale').find('a').click(function(event) {
                event.preventDefault(); event.stopPropagation();
                var locale = $(this).attr('id').replace('js-locale-', '');
                localStorage.setItem('locale', locale);
                document.location.reload(); // TODO: rerender current view instead of reloading
            });
        })
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
    });


    return App;
});
