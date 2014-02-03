define(['app', 'app/entities/service', 'app/services/edit/edit_view'], function (App, Entities, Edit) {
    var $sandbox = $('#sandbox');

    describe('Service :: Edit :: View', function () {
        var view = null,
            service = new Entities.Service({
                id: 8
            });

        beforeEach(function () {
            view = new Edit.View({
                model: service
            });
            $sandbox.html(view.render().$el);
        });

        afterEach(function () {
            view.remove();
            $sandbox.html('');
        });

        it('The render function should always return the view itself', function () {
            expect(view.render()).toBe(view);
        });

        it('The view should be represented by a "div" element', function () {
            expect(view.el.tagName.toLowerCase()).toBe('div');
        });

        it('Check the model of the view', function () {
            expect(view.model.get('name')).toBeFalsy();

            view = new Edit.View({
                model: new Entities.Service({
                    name: 'test'
                })
            });

            expect(view.model.get('name')).toBe('test');
        });

        it('Check the submit functionality', function () {
            spyOn(view, 'trigger');

            $sandbox.find('button.js-submit').click();

            expect(view.trigger).toHaveBeenCalledWith('form:submit', jasmine.any(Object));
        });
    });
});