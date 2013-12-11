define(['app'], function(App) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        Entities.Task = Backbone.Model.extend({
            defaults: {
                title: null,
                description: null,
                status: null,
                priority: null,
                start: null,
                end: null,
                duration: null,
                progress: null
            },

            validate: function(attrs, options) {
                var errors = {};

                if (!attrs.title) {
                    errors.title = 'can\'t be blank';
                }

                if (attrs.end < attrs.start) {
                    errors.end = 'must be later than start';
                }

                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });


        Entities.TaskCollection = Backbone.Collection.extend({
            model: Entities.Task,
            url: '/tasks',
            comparator: 'priority'
        });

    });
});
