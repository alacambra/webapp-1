define(['marionette', 'config'], function(Marionette, CONFIG){
    var App = new Marionette.Application();


    App.addRegions({
        main_region: '#main-region'
    });


    App.navigate = function(route,  options){
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function(){
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

                if (App.getCurrentRoute() === '') {
                    App.trigger('tasks:list');
                }
            });
        }
    });


    return App;
});
