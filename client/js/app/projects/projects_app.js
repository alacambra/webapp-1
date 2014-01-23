define(['app'], function (App) {
    App.module('ProjectsApp', function (ProjectsApp, App, Backbone, Marionette, $, _) {
        ProjectsApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'projects': 'projects_list',
                'projects/new': 'project_new',
                'projects/:id': 'project_show',
                'projects/:id/edit': 'project_edit',
                'projects/:id/tasks/new': 'project_task_new'
            }
        });


        App.path['projects'] = {
            list: function() { return {
                href: '#projects',
                event: 'projects:list' };
            },
            create: function() { return {
                href: '#projects/new',
                event: 'project:create' };
            },
            show: function(id) { return {
                href: '#projects/' + id,
                event: 'project:show,' + id };
            },
            edit: function(id) { return {
                href: '#projects/' + id + '/edit',
                event: 'project:edit,' + id };
            },
            create_task: function (id) {
                return {
                    href: '#projects/' + id + '/tasks/new',
                    event: 'project:task:new,' + id
                };
            }
        };


        App.on('projects:list', function() {
            App.navigate('projects');
            API.projects_list();
        });

        App.on('project:create', function() {
            App.navigate('projects/new');
            API.project_edit();
        });

        App.on('project:show', function(id) {
            App.navigate('projects/' + id);
            API.project_show(id);
        });

        App.on('project:edit', function(id) {
            App.navigate('projects/' + id + '/edit');
            API.project_edit(id);
        });

        App.on('project:delete', function(id, redirect) {
            API.project_delete(id, redirect);
        });

        App.on('project:task:new', function (id) {
            App.navigate('projects/' + id + '/tasks/new');
            API.project_task_new(id);
        });


        var API = {
            projects_list: function () {
                require(['app/projects/list/list_controller'], function (ProjectsController) {
                    ProjectsController.projects_list();
                    highlight_navi();
                });
            },

            project_new: function () {
                require(['app/projects/edit/edit_controller'], function (EditController) {
                    EditController.project_edit();
                    highlight_navi();
                });
            },

            project_show: function (id) {
                require(['app/projects/show/show_controller'], function (ShowController) {
                    ShowController.project_show(id);
                    highlight_navi();
                });
            },

            project_edit: function (id) {
                require(['app/projects/edit/edit_controller'], function (EditController) {
                    EditController.project_edit(id);
                    highlight_navi();
                });
            },

            project_delete: function (project, redirect) {
                if (confirm(I18n.t('delete_confirm', { name: project.get('title') }))) {
                    require(['app/projects/list/list_controller'], function (ListController) {
                        ListController.project_delete(project, redirect);
                    });
                }
            },

            project_task_new: function (id) {
                require(['app/tasks/edit/edit_controller'], function (EditController) {
                    EditController.create_project_task(id);
                    highlight_navi();
                });
            }
        };


        App.addInitializer(function () {
            new ProjectsApp.Router({
                controller: API
            });
        });


        function highlight_navi() {
            App.trigger('main_navi:highlight:item', 'projects');
        }
    });

    return App.ProjectsApp;
});