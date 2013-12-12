define(['app'], function(App) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        Entities.Task = Backbone.Model.extend({
            urlRoot: '/api/tasks',
            //urlRoot: '/api/webapplication/rest/task',

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

                if (attrs.endDate < attrs.startDate) {
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
            url: '/api/tasks',
            //url: '/api/webapplication/rest/task',
            comparator: 'priority'
        });

    });
});
