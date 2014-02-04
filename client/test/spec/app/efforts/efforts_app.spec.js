define(['app', 'app/efforts/efforts_app', 'app/entities/effort'], function(App, EffortsApp, Entities) {
    describe('Effort :: App', function() {
        it('Navigate to efforts list', function() {
            spyOn(App, 'navigate');

            App.trigger('efforts:list', 23);

            expect(App.navigate).toHaveBeenCalledWith('tasks/23/efforts');
        });

        it('Navigate to new effort', function() {
            spyOn(App, 'navigate');

            App.trigger('effort:create', 17);

            expect(App.navigate).toHaveBeenCalledWith('tasks/17/efforts/new');
        });

        it('Navigate to show effort', function() {
            var id = 1;
            var task_id = 2;

            spyOn(App, 'navigate');

            App.trigger('effort:show', task_id, id);

            expect(App.navigate).toHaveBeenCalledWith('tasks/' + task_id + '/efforts/' + id);
        });

        it('Navigate to edit effort', function() {
            var id = 1;
            var task_id = 2;

            spyOn(App, 'navigate');

            App.trigger('effort:edit', task_id, id);

            expect(App.navigate).toHaveBeenCalledWith('tasks/' + task_id + '/efforts/' + id + '/edit');
        });

        it('Confirm to delete effort', function() {
            var effort = new Entities.Effort({
                    id: 1,
                    title: 'Effort1'
                }, {
                    task_id: 2
                }),
                redirect = 'redirect';

            spyOn(window, 'confirm');

            App.trigger('effort:delete', effort.task_id, effort, redirect);

            expect(window.confirm).toHaveBeenCalledWith(jasmine.any(String));
        });

        describe('API', function () {
            it('Should delete a specified effort with optional redirect', function () {
                var effort = new Entities.Effort({ id: 8 }, { task_id: 22 });
                var redirect;

                spyOn(window, 'confirm').andReturn(true);
                spyOn(App, 'trigger').andCallThrough();
                spyOn(effort, 'destroy');

                App.trigger('effort:delete', effort.task_id, effort, redirect);

                expect(effort.destroy).toHaveBeenCalled();
                expect(App.trigger).not.toHaveBeenCalledWith(redirect);

                redirect = 'home';

                App.trigger('effort:delete', effort.task_id, effort, redirect);

                expect(effort.destroy).toHaveBeenCalled();
                expect(App.trigger).toHaveBeenCalledWith(redirect, effort.task_id);
            });
        });
    });
});