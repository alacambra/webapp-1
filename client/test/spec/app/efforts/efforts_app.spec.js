define(['app', 'app/efforts/efforts_app', 'app/entities/effort'], function(App, EffortsApp, Entities) {
    describe('Effort :: App', function() {
        it('Navigate to efforts list', function() {
            spyOn(App, 'navigate');

            App.trigger('efforts:list', 23);

            expect(App.navigate).toHaveBeenCalledWith('tasks/23/efforts');
        });

        it('Navigate to new effort', function() {
            spyOn(App, 'navigate');

            App.trigger('effort:new', 17);

            expect(App.navigate).toHaveBeenCalledWith('tasks/17/efforts/new');
        });

        it('Navigate to show effort', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('effort:show', id);

            expect(App.navigate).toHaveBeenCalledWith('efforts/' + id);
        });

        it('Navigate to edit effort', function() {
            var id = 1;

            spyOn(App, 'navigate');

            App.trigger('effort:edit', id);

            expect(App.navigate).toHaveBeenCalledWith('efforts/' + id + '/edit');
        });

        it('Confirm to delete effort', function() {
            var effort = new Entities.Effort({
                    id: 1,
                    title: 'Effort1'
                }),
                redirect = 'redirect';

            spyOn(window, 'confirm');

            App.trigger('effort:delete', effort, redirect);

            expect(window.confirm).toHaveBeenCalledWith(jasmine.any(String));
        });
    });
});