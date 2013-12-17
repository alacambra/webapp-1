define(['app'], function(App) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        var base_url;

        switch(document.location.host.substr(0,3)) {
            case 'tst': base_url = '/api/webapplication/rest/task'; break;
            case 'dev': base_url = '/api/tasks';
            default: '/rest/task';
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
    });

    return App.Entities;
});
