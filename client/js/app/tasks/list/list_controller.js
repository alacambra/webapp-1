define(['app', 'app/entities/task', 'app/tasks/list/list_view'],
function(App, View){
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _){
        List.Controller = {
            list_tasks: function() {
                var fetching_tasks = App.request("task:entities");
                $.when(fetching_tasks).done(function(tasks){
                    var list_view = new List.Tasks({
                        collection: tasks
                    });


                    App.main_region.show(list_view);


                    // list view handlers
                    list_view.on('task:create', create);
                    list_view.on('itemview:task:show', show);
                    list_view.on('itemview:task:edit', edit);
                    list_view.on('itemview:task:delete', destroy);


                    // list view handler functions
                    function create() {
                        require(['app/tasks/edit/edit_controller'], function (EditController) {
                            EditController.edit_task();
                            App.navigate('tasks/new');
                        });
                    }

                    function show(child_view, model_id) {
                        require(['app/tasks/show/show_controller'], function (ShowController) {
                            ShowController.show_task(model_id);
                            App.navigate('tasks/' + model_id);
                        });
                    }

                    function edit(child_view, model_id) {
                        require(['app/tasks/edit/edit_controller'], function (EditController) {
                            EditController.edit_task(model_id);
                            App.navigate('tasks/' + model_id + '/edit');
                        });
                    }

                    function destroy(child_view, model) {
                        model.destroy();
                    }
                });
            }
        }
    });

    return App.Tasks.List.Controller;
});
