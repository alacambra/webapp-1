define(['app', 'config', 'app/validation_helper', 'backbone_faux_server'], function(App, CONFIG, validation_helper, Faux) {
    App.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
        var base_url = App.model_base_url('projects');


        Entities.Project = Backbone.Model.extend({
            urlRoot: base_url,

            defaults: {
                title: null,
                description: null,
                status: 1,
                startDate: null,
                endDate: null
            },

            validate: function(attrs, options) {
                var errors = {};

                errors = validation_helper.validates_presence_of('title', attrs, errors);

                if (attrs.startDate != 0 && attrs.endDate != 0) {
                    errors = validation_helper.validates_inclusion_of('endDate', attrs.startDate, attrs.endDate, attrs, errors, {
                        message : I18n.t('errors.validation.date_later_than', { attr: I18n.t('project.label.start_date') })
                    });
                }

                return _.isEmpty(errors) ? false : errors;
            }
        });


        Entities.ProjectCollection = Backbone.Collection.extend({
            model: Entities.Project,
            url: base_url,
            comparator: 'priority'
        });


        var API = {
            get_project_entities: function() {
                var projects = new Entities.ProjectCollection();
                var defer = $.Deferred();

                projects.fetch({
                    success: function(model, response) {
                        defer.resolve(model, response);
                    },
                    error: function(model, response) {
                        console.log('fetch collection error');
                        defer.resolve(false, response);
                    }
                });

                return defer.promise();
            },

            get_project_entity: function(project_id) {
                var project_entity;
                var defer = $.Deferred();

                if (typeof project_id !== 'object') {
                    project_entity = new Entities.Project({ id: project_id });

                    if (project_id !== undefined) { // project id was set, load entity
                        project_entity.fetch({
                            success: function(model, response) {
                                defer.resolve(model, response);
                            },
                            error: function(model, response) {
                                console.log('fetch entity error');
                                defer.resolve(false, response);
                            }
                        });
                    } else { // no project id was set, return new instance
                        defer.resolve(project_entity);
                    }
                } else { // given "project_id" is a model, return unchanged
                    defer.resolve(project_id);
                }

                return defer.promise();
            }
        };


        App.reqres.setHandler('project:entities', function() {
            return API.get_project_entities();
        });


        App.reqres.setHandler('project:entity', function(id) {
            return API.get_project_entity(id);
        });
        

        // FAUX SERVER!!!

        var projects = [
            { id: 1, title: 'Project1', description: 'bla bla', startDate: 1387206224 },
            { id: 2, title: 'Project2', description: 'bla bla bla bla' },
            { id: 3, title: 'Project3', description: 'bla bla bla bla bla bla', status: 1 },
            { id: 4, title: 'Project4', description: 'bla bla bla bla bla bla bla bla', status: 2},
            { id: 5, title: 'Project5', description: 'bla bla bla bla bla bla bla bla bla bla' }
        ];

        Faux.addRoute('getProjects', base_url, 'GET', function (context) {
            return projects;
        });

        Faux.addRoute('getProject', base_url + '/:id', 'GET', function(context, id) {
            var project;
            _.forEach(projects, function (t) {
                if (t.id === parseInt(id)) {
                    project = t;
                }
            });
            return project || 'HTTP/1.1 404 Not Found';
        });

        Faux.enable(CONFIG.rest.faux_enable);
    });

    return App.Entities;
});
