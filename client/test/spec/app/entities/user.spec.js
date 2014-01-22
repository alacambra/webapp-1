define(['app/entities/user', 'moment'], function(Entities, moment) {
    return describe('User :: Entities', function() {
        var user = null,
            users = null;

        beforeEach(function() {
            user = new Entities.User();
            users = new Entities.UserCollection();
        });

        describe('Model', function() {
            it('must have a urlRoot that contains "user"', function() {
                expect(Entities.User.prototype.urlRoot).toContain('user');
            });

            it('must have default attributes', function() {
                expect(user.get('firstName')).toBeNull();
                expect(user.get('lastName')).toBeNull();
                expect(user.get('birthDate')).toBeNull();
                expect(user.get('email')).toBeNull();
            });

            describe('Validation', function() {
                it('must fail with default attributes', function() {
                    expect(user.validate(user.attributes)).toBeDefined();
                });

                describe('first name', function() {
                    it('must be set', function() {
                        user.set('firstName', 'Alice');
                        expect(user.validate(user.attributes).firstName).toBeUndefined();
                    });


                    it('must not be empty', function() {
                        user.set('firstName', '');
                        expect(user.validate(user.attributes).firstName).toBeDefined();

                        user.set('firstName', ' ');
                        expect(user.validate(user.attributes).firstName).toBeDefined();
                    });
                });

                describe('last name', function() {
                    it('must be set', function() {
                        user.set('lastName', 'Riddell');
                        expect(user.validate(user.attributes).lastName).toBeUndefined();
                    });


                    it('must not be empty', function() {
                        user.set('lastName', '');
                        expect(user.validate(user.attributes).lastName).toBeDefined();

                        user.set('lastName', ' ');
                        expect(user.validate(user.attributes).lastName).toBeDefined();
                    });
                });

                describe('email', function() {
                    it('must be well formatted', function() {
                        user.set('email', 'alice@riddell.com');
                        expect(user.validate(user.attributes).email).toBeUndefined();

                        user.set('email', 'alice.riddell@mail.foo.bar');
                        expect(user.validate(user.attributes).email).toBeUndefined();
                    });


                    it('must not be incomplete', function() {
                        user.set('email', 'alice');
                        expect(user.validate(user.attributes).email).toBeDefined();

                        user.set('email', 'alice@riddell');
                        expect(user.validate(user.attributes).email).toBeDefined();

                        user.set('email', 'alice.com');
                        expect(user.validate(user.attributes).email).toBeDefined();

                        user.set('email', 'alice.com@riddell');
                        expect(user.validate(user.attributes).email).toBeDefined();
                    });

                    it('must not be empty', function() {
                        user.set('email', '');
                        expect(user.validate(user.attributes).email).toBeDefined();

                        user.set('email', ' ');
                        expect(user.validate(user.attributes).email).toBeDefined();
                    });
                });


                describe('password', function() {
                    describe('for new users', function() {
                        it('must be confirmed', function() {
                            user.set({ password: 'password', passwordConfirmation: 'password' });
                            expect(user.validate(user.attributes).password).toBeUndefined();
                        });

                        it('must not be empty', function() {
                            user.set({ password: '', passwordConfirmation: '' });
                            expect(user.validate(user.attributes).password).toBeDefined();
                        });

                        it('must not be unconfirmed', function() {
                            user.set({ password: 'any password', passwordConfirmation: '' });
                            expect(user.validate(user.attributes).password).toBeDefined();
                        });

                        it('must not be too short', function() {
                            user.set({ password: 'a', passwordConfirmation: 'a' });
                            expect(user.validate(user.attributes).password).toBeDefined();
                        });

                        it('must not be too long', function() {
                            user.set({
                                password:             'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                                passwordConfirmation: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' });
                            expect(user.validate(user.attributes).password).toBeDefined();
                        });
                    });
                });


                describe('password', function() {
                    describe('for existing users', function() {
                        beforeEach(function() {
                            user.set('id', 23); // user considered as existing
                        });

                        it('may be empty', function() {
                            user.set({ password: '', passwordConfirmation: '' });
                            expect(user.validate(user.attributes).password).toBeUndefined();
                        });

                        it('must be confirmed', function() {
                            user.set({ password: 'password', passwordConfirmation: 'password' });
                            expect(user.validate(user.attributes).password).toBeUndefined();
                        });

                        it('must not be unconfirmed', function() {
                            user.set({ password: 'any password', passwordConfirmation: '' });
                            expect(user.validate(user.attributes).password).toBeDefined();
                        });

                        it('must not be too short', function() {
                            user.set({ password: 'a', passwordConfirmation: 'a' });
                            expect(user.validate(user.attributes).password).toBeDefined();
                        });

                        it('must not be too long', function() {
                            user.set({
                                password:             'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                                passwordConfirmation: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' });
                            expect(user.validate(user.attributes).password).toBeDefined();
                        });
                    });
                });


                describe('birth date', function() {
                    it('may be empty', function() {
                        user.set('birthDate', '');
                        expect(user.validate(user.attributes).birthDate).toBeUndefined();
                    });

                    it('may be max. 100 years ago', function() {
                        user.set('birthDate', 0);
                        expect(user.validate(user.attributes).birthDate).toBeUndefined();

                        user.set('birthDate', 1);
                        expect(user.validate(user.attributes).birthDate).toBeUndefined();

                        user.set('birthDate', -1);
                        expect(user.validate(user.attributes).birthDate).toBeUndefined();

                        user.set('birthDate', -1767229200);
                        expect(user.validate(user.attributes).birthDate).toBeUndefined();

                        user.set('birthDate', moment().unix());
                        expect(user.validate(user.attributes).birthDate).toBeUndefined();

                        user.set('birthDate', moment().unix() - 1);
                        expect(user.validate(user.attributes).birthDate).toBeUndefined();

                        user.set('birthDate', -1767229201);
                        expect(user.validate(user.attributes).birthDate).toBeDefined();
                    });

                    it('must not be in the future', function() {
                        user.set('birthDate', moment().unix() + 1);
                        expect(user.validate(user.attributes).birthDate).toBeDefined();
                    });
                });
            });
        });

        describe('Collection', function() {
            it('must have a url that contains "user"', function() {
                expect(Entities.UserCollection.prototype.url).toContain('user');
            });
        });
    });
});