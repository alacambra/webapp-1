define(['app/entities/user_session'], function(Entities) {
    return describe('Entities :: UserSession', function() {
        var user_session = null;

        
        beforeEach(function() {
            user_session = new Entities.UserSession();
        });

        
        describe('Model', function() {
            it('must have a urlRoot that contains "user_session"', function() {
                expect(Entities.UserSession.prototype.urlRoot).toContain('user_session');
            });

            it('must have default attributes', function() {
                expect(user_session.get('username')).toBeUndefined();
                expect(user_session.get('password')).toBeUndefined();
            });

            
            describe('Validation', function() {
                it('must fail with default attributes', function() {
                    expect(user_session.validate(user_session.attributes)).toBeDefined();
                });

                describe('username', function() {
                    it('must be set', function() {
                        user_session.set('username', 'alice@riddell.com');
                        expect(user_session.validate(user_session.attributes).username).toBeUndefined();
                    });


                    it('must not be empty', function() {
                        user_session.set('username', '');
                        expect(user_session.validate(user_session.attributes).username).toBeDefined();

                        user_session.set('username', ' ');
                        expect(user_session.validate(user_session.attributes).username).toBeDefined();
                    });
                });

                
                describe('password', function() {
                    it('must be set', function() {
                        user_session.set('password', 'password');
                        expect(user_session.validate(user_session.attributes).password).toBeUndefined();
                    });


                    it('must not be empty', function() {
                        user_session.set('password', '');
                        expect(user_session.validate(user_session.attributes).password).toBeDefined();

                        user_session.set('password', ' ');
                        expect(user_session.validate(user_session.attributes).password).toBeDefined();
                    });
                });

            });
        });
    });
});