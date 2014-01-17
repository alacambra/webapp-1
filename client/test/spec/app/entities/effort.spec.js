define(['app/entities/effort'], function(Entities) {
    return describe('Effort :: Entities', function() {
        var effort = null,
            efforts = null;

        beforeEach(function() {
            effort = new Entities.Effort({ task_id: 10 });
            efforts = new Entities.EffortCollection({ task_id: 23 });
        });

        describe('Model', function() {
            it('Should have a urlRoot that contains \'tasks\' and \'efforts\'', function() {
                expect(effort.urlRoot()).toContain('tasks');
                expect(effort.urlRoot()).toContain('effort');
            });

            it('Check default attributes', function() {
                expect(effort.task_id).toBeDefined();
                expect(effort.get('date')).toBeNull();
                expect(effort.get('time')).toBeNull();
                expect(effort.get('comment')).toBeNull();
            });

            it('Default Effort Model should always return an error object on validate', function() {
                expect(effort.validate(effort.attributes)).toBeDefined();
            });

            it('The date of has to be an integer and not empty and between +/- 100 years from now', function() {
                effort.set('date', '');
                expect(effort.validate(effort.attributes).date).toBeDefined();

                effort.set('date', 0);
                expect(effort.validate(effort.attributes).date).toBeDefined();

                effort.set('date', -1767229201);
                expect(effort.validate(effort.attributes).date).toBeDefined();

                effort.set('date', 7258118400);
                expect(effort.validate(effort.attributes).date).toBeDefined();


                effort.set('date', 1);
                expect(effort.validate(effort.attributes).date).toBeUndefined();

                effort.set('date', -1);
                expect(effort.validate(effort.attributes).date).toBeUndefined();

                effort.set('date', -1767229200);
                expect(effort.validate(effort.attributes).date).toBeUndefined();

                effort.set('date', 2524608000);
                expect(effort.validate(effort.attributes).date).toBeUndefined();
            });

            it('The time must be an integer', function() {
                effort.set('time', 0);
                expect(effort.validate(effort.attributes).time).toBeDefined();

                effort.set('time', -1);
                expect(effort.validate(effort.attributes).time).toBeDefined();

                effort.set('time', -100);
                expect(effort.validate(effort.attributes).time).toBeDefined();

                effort.set('time', 1);
                expect(effort.validate(effort.attributes).time).toBeUndefined();

                effort.set('time', 120);
                expect(effort.validate(effort.attributes).time).toBeUndefined();

                effort.set('time', 60 * 24 * 365);
                expect(effort.validate(effort.attributes).time).toBeUndefined();

            });
        });

        describe('Collection', function() {
            it('Should have a url that contains \'effort\'', function() {
                expect(efforts.url()).toContain('efforts');
                expect(Entities.EffortCollection.prototype.url()).toContain('efforts');
            });
        });
    });
});