define(['app/entities/user'], function (Entities) {
    return describe('User :: Entities', function () {
        var user = null,
            users = null;

        beforeEach(function () {
            user = new Entities.User();
            users = new Entities.UserCollection();
        });

        describe('Model', function () {
            it('Should have a urlRoot that contains \'user\'.', function() {
                expect(Entities.User.prototype.urlRoot).toContain('user');
            });

            it('Check default attributes.', function () {
                expect(user.get('firstName')).toBeNull();
                expect(user.get('lastName')).toBeNull();
                expect(user.get('birthDate')).toBeNull();
                expect(user.get('email')).toBeNull();
            });

            it('Default User Model should always return an error object on validate.', function () {
                expect(user.validate(user.attributes)).toBeTruthy();
            });

            it('The title of a User Model has to be a string and not empty.', function () {
                user.set('firstName', 'Alice');
                expect(user.validate(user.attributes).firstName).toBeUndefined();

                user.set('firstName', 0);
                expect(user.validate(user.attributes).firstName).toBeUndefined();

                user.set('firstName', 1000);
                expect(user.validate(user.attributes).firstName).toBeUndefined();

                user.set('firstName', true);
                expect(user.validate(user.attributes).firstName).toBeUndefined();

                user.set('firstName', {});
                expect(user.validate(user.attributes).firstName).toBeDefined();

                user.set('firstName', []);
                expect(user.validate(user.attributes).firstName).toBeDefined();

                user.set('firstName', false);
                expect(user.validate(user.attributes).firstName).toBeDefined();
            });
        });

        describe('Collection', function () {
            it('Should have a url that contains \'user\'.', function() {
                expect(Entities.UserCollection.prototype.url).toContain('user');
            });
        });
    });
});