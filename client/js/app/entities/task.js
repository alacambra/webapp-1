define(['app'], function(App) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        var base_url;

        switch(document.location.host.substr(0,3)) {
            case 'tst': base_url = '/api/webapplication/rest/task'; break;
            default: base_url = '/api/tasks';
        }


        Entities.Task = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                title: null,
                description: null,
                status: null,
                priority: null,
                startDate: null,
                endDate: null,
                duration: null,
                progress: null
            },

            validate: function(attrs, options) {
                var errors = {};

                if (!attrs.title) {
                    errors.title = 'can\'t be blank';
                }

                if (attrs.endDate && attrs.endDate < attrs.startDate) {
                    errors.startDate = 'must be earlier than end';
                    errors.endDate = 'must be later than start';
                }

                if (!_.isEmpty(errors)) {
                    return errors;
                }
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

            get_task_entity: function(task_id, force_refresh) {
                var task;
                if (force_refresh === undefined) force_refresh = false;

                var defer = $.Deferred();

                if (force_refresh || typeof task_id !== 'object') {
                    if (force_refresh && typeof task_id === 'object') {
                        task_id = task_id.get('id'); // given "task_id" is a model, extract id (force_refresh flag is set)
                    }

                    task = new Entities.Task({ id: task_id });

                    if (task_id !== undefined) { // task id was set, load entity
                        task.fetch({
                            success: function(data) {
                                defer.resolve(data);
                            },
                            error: function(data) {
                                defer.resolve(undefined);
                            }
                        });
                    } else { // no task id was set, return new instance
                        defer.resolve(task);
                    }
                } else { // given "task_id" is a model, return unchanged
                    task = task_id;
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
    });
});
