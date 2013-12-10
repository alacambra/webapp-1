define(['app', 'app/entities/task', 'app/tasks/list/list_view'], function(App, View){
    App.module('Tasks.List', function(List, App, Backbone, Marionette, $, _){
        List.Controller = {
            list_tasks: function() {
                var tasks_list_view = new List.Tasks({
                    collection: new App.Entities.TaskCollection([
                        new App.Entities.Task({
                            title: 'foo',
                            description: 'lorem ipsum',
                            status: 3,
                            priority: 2,
                            start: '2013-12-11',
                            end: '2013-12-13',
                            duration: 120,
                            progress: 0.5
                        }),
                        new App.Entities.Task({
                            title: 'bar',
                            description: '',
                            status: 2,
                            priority: 1,
                            start: '2013-12-09',
                            end: '2013-12-22',
                            duration: 75,
                            progress: 0.2
                        }),
                        new App.Entities.Task({
                            title: 'Hurz',
                            description: 'bli bla blub',
                            status: 0,
                            priority: 3,
                            start: '2014-01-01',
                            end: '2014-02-16',
                            duration: 1600,
                            progress: 0
                        })
                    ])
                });

                App.main_region.show(tasks_list_view);
            }
        }
    });

    return App.Tasks.List.Controller;
});
