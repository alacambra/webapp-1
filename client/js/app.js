define(['marionette'], function(Marionette){
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
