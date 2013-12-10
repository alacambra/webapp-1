define(['marionette'], function(Marionette){
    var App = new Marionette.Application();


    App.addRegions({
        main_region: '#main-region'
    });


    App.on('initialize:after', function(){
        require(['app/tasks/list/list_controller'], function (TasksController) {
            TasksController.list_tasks();
        });
    });


    return App;
});
