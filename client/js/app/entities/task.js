define(['app', 'backbone_faux_server'], function(App, Faux) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        var base_url;

        switch(document.location.host.substr(0,3)) {
            case 'tst': base_url = '/api/webapplication/rest/task'; break;
            case 'dev': base_url = '/api/tasks'; break;
            default: base_url = '/webapplication/rest/task';
        }


        Entities.Task = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                title: null,
                description: null,
                status: 1,
                priority: 1,
                startDate: null,
                endDate: null,
                duration: null,
                progress: 0
            },

            validate: function(attrs, options) {
                var errors = {};

                if (typeof attrs.title !== 'string') {
                    errors.title = 'invalid input';
                } else if (attrs.title.length === 0) {
                    errors.title = 'can\'t be blank';
                }

                if (attrs.endDate && attrs.endDate < attrs.startDate) {
                    errors.startDate = 'must be earlier than end';
                    errors.endDate = 'must be later than start';
                }

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.TaskCollection = Backbone.Collection.extend({
            model: Entities.Task,
            url: base_url,
            comparator: 'priority'
        });


        var API = {
            get_task_entities: function() {
                var tasks = new Entities.TaskCollection();
                var defer = $.Deferred();
                tasks.fetch({
                    success: function(data) {
                        defer.resolve(data);
                    },
                    error: function(data) {
                        console.log('fetch collection error');
                    }
                });
                return defer.promise();
            },

            get_task_entity: function(task, force_refresh) {
                var task_entity;
                if (force_refresh === undefined) force_refresh = false;

                var defer = $.Deferred();

                if (force_refresh || typeof task !== 'object') {
                    if (force_refresh && typeof task === 'object') {
                        task = task.get('id'); // given "task_id" is a model, extract id (force_refresh flag is set)
                    }

                    task_entity = new Entities.Task({ id: task });

                    if (task !== undefined) { // task id was set, load entity
                        task_entity.fetch({
                            success: function(data) {
                                defer.resolve(data);
                            },
                            error: function(data) {
                                defer.resolve(undefined);
                            }
                        });
                    } else { // no task id was set, return new instance
                        defer.resolve(task_entity);
                    }
                } else { // given "task_id" is a model, return unchanged
                    defer.resolve(task);
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler("task:entities", function(){
            return API.get_task_entities();
        });


        App.reqres.setHandler("task:entity", function(id, force_refresh){
            return API.get_task_entity(id, force_refresh);
        });

        // FAUX SERVER!!!

        var tasks = [
            { id: 1, title: 'Task1', description: 'bla bla', startDate: 1387206224 },
            { id: 2, title: 'Task2', description: 'bla bla bla bla' },
            { id: 3, title: 'Task3', description: 'bla bla bla bla bla bla', progress: 1 },
            { id: 4, title: 'Task4', description: 'bla bla bla bla bla bla bla bla', progress: 0.2 },
            { id: 5, title: 'Task5', description: 'bla bla bla bla bla bla bla bla bla bla', progress: 0.5 }
        ];

        Faux.addRoute('getTasks', '/webapplication/rest/task', 'GET', function (context) {
            return tasks;
        });

        Faux.addRoute('getTask', '/webapplication/rest/task/:id', 'GET', function(context, id) {
            var task;
            _.forEach(tasks, function (t) {
                if (t.id === parseInt(id)) {
                    task = t;
                }
            });
            return task;
        });

        Faux.enable(false);
    });

    return App.Entities;
});
