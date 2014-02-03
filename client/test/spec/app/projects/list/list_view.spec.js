define(['config',
        'app',
        'app/entities/project',
        'app/projects/list/list_view',
        'app/app_helper',
        'app/view_helper'],
function(CONFIG, App, Entities, List, app_helper, view_helper) {
    var $sandbox = $('#sandbox');

    describe('Project :: List :: View', function() {
        var listView = null,
            itemView = null,
            project1 = new Entities.Project({
                id: 1
            }),
            project2 = new Entities.Project({
                id: 2
            }),
            projects = new Entities.ProjectCollection([
                project1,
                project2
           ]);

        beforeEach(function() {
            I18n.locale = CONFIG.i18n.default_locale;

            listView = new List.View({
                collection: projects,
                templateHelpers: _.extend({}, app_helper, view_helper)
            });
            itemView = new List.ItemView({
                model: project1
            });
            $sandbox.html(listView.render().$el);
        });

        afterEach(function() {
            listView.remove();
            itemView.remove();
            $sandbox.html('');
        });

        it('The render function of list should always return the list view itself', function() {
            expect(listView.render()).toBe(listView);
        });

        it('The render function of item should always return the item view itself', function() {
            expect(itemView.render()).toBe(itemView);
        });

        it('This list view should be represented by a "div" element', function() {
            expect(listView.el.tagName.toLowerCase()).toBe('div');
        });

        it('This item view should be represented by a "div" element', function() {
            expect(itemView.el.tagName.toLowerCase()).toBe('div');
        });

        _.each(CONFIG.i18n.available_locales, function(locale) {
            it('Must not contain missing translations (' + locale.toUpperCase() + ')', function() {
                I18n.locale = locale;
                expect(find_missing_translation(listView.render().$el)).toBeUndefined();
            });
        });

        it('Check if list view rendered two items', function() {
            expect($sandbox.find('#js-project-list-items .list-row').length).toBe(2);
        });

        it('Check the create functionality of list view', function() {
            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="project:create"]').click();

            expect(App.trigger).toHaveBeenCalledWith('project:create');
        });

        it('Check the show functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="project:show,' + project1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('project:show', project1.get('id') + '');
        });

        it('Check the edit functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('a[data-navigate="project:edit,' + project1.get('id') + '"]').click();

            expect(App.trigger).toHaveBeenCalledWith('project:edit', project1.get('id') + '');
        });

        it('Check the delete functionality of item view', function() {
            $sandbox.html(itemView.render().$el);

            spyOn(App, 'trigger');

            $sandbox.find('.js-delete-project').click();

            expect(App.trigger).toHaveBeenCalledWith('project:delete', project1);
        });
    });
});




















