define(['app', 'app/entities/task', 'app/tasks/list/list_view'],
function(App, View){
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _){
        List.Controller = {
            list_tasks: function() {
                var tasks = new App.Entities.TaskCollection([
                    new App.Entities.Task({
                        title: 'foo',
                        description: 'lorem ipsum',
                        status: 3,
                        priority: 2,
                        start: 1386720000,
                        end: 1386892800,
                        duration: 120,
                        progress: 0.5
                    }),
                    new App.Entities.Task({
                        title: 'bar',
                        description: '',
                        status: 2,
                        priority: 1,
                        start: 1386547200,
                        end: 1387670400,
                        duration: 75,
                        progress: 0.2
                    }),
                    new App.Entities.Task({
                        title: 'Hurz',
                        description: 'bli bla blub',
                        status: 0,
                        priority: null,
                        start: 1388534400,
                        end: 1392508800,
                        duration: 1600,
                        progress: 0
                    })
                ]);


                var list_view = new List.Tasks({
                    collection: tasks
                });


                App.main_region.show(list_view);


                // list view handlers
                list_view.on('itemview:task:delete', destroy);
                list_view.on('itemview:task:show', show);


                // list view handler functions
                function destroy(child_view, model) {
                    tasks.remove(model);
                    //model.destroy();
                }

                function show(child_view, model) {
                    require(['app/tasks/show/show_controller'], function (ShowController) {
                        ShowController.show_task(model);
                    });
                }
            }
        }
    });

    return App.Tasks.List.Controller;
});
