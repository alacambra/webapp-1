define(['app', 'app/entities/task', 'app/tasks/list/list_view'],
function(App, View){
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _){
        List.Controller = {
            tasks_list: function() {
                var fetching_tasks = App.request("task:entities");
                $.when(fetching_tasks).done(function(tasks){
                    var list_view = new List.Tasks({
                        collection: tasks
                    });


                    App.main_region.show(list_view);


                    // list view handlers
                    list_view.on('itemview:task:delete', destroy);


                    // list view handler functions
                    function destroy(child_view, model) {
                        model.destroy();
                    }
                });
            }
        }
    });

    return App.Tasks.List.Controller;
});
