define(['app/validation_helper'], function (validation_helper) {
    return describe('App :: ValidationHelper', function () {
        var validation;

        describe('validates_confirmation_of', function () {
            it('must validate confirmation', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: '', passwordConfirmation: '' }).password).toBeUndefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: 'a' }).password).toBeUndefined();
            });

            it('must optionally conditionally skip validation', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }, {}, { if: false }).password).toBeUndefined();
            });

            it('must optionally use specific error message', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }, {}, { message: 'gotcha' }).password).toEqual('gotcha');
            });

            it('must invalidate wrong confirmation', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: '' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: 'b' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { password: '', passwordConfirmation: 'b' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { passwordConfirmation: 'a' }).password).toBeDefined();
            });

            it('must keep other existing errors', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: 'a' }, { other: 'error'}).other).toEqual('error');
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }, { other: 'error'}).other).toEqual('error');
            });

            it('must skip existing errors', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }, { password: 'error'}).password).toEqual('error');
            });

            it('must check multiple attributes', function () {
                validation = validation_helper.validates_confirmation_of(['password', 'email'], {
                    password: 'a',
                    passwordConfirmation: 'a',
                    email: 'b',
                    emailConfirmation: 'b'
                });
                expect(validation.password).toBeUndefined();
                expect(validation.email).toBeUndefined();

                validation = validation_helper.validates_confirmation_of(['password', 'email'], {
                    password: 'a',
                    passwordConfirmation: '1',
                    email: 'b',
                    emailConfirmation: '2'
                });
                expect(validation.password).toBeDefined();
                expect(validation.email).toBeDefined();
            });
        });


        describe('validates_numericality_of', function () {
            it('must validate numeric values', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 1.23 }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 0 }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: -10 }).amount).toBeUndefined();
            });

            it('must optionally validate only integers', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }, {}, { only_integer: true }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 1.2 }, {}, { only_integer: true }).amount).toBeDefined();
            });

            it('must optionally conditionally skip validation', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { if: false }).amount).toBeUndefined();
            });

            it('must optionally allow blank values', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { allow_blank: true }).amount).toBeUndefined();
            });

            it('must optionally use specific error message', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { message: 'gotcha' }).amount).toEqual('gotcha');
            });

            it('must invalidate non-numeric values', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 'A' }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: '1' }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: NaN }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: {} }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: [] }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: [1] }).amount).toBeDefined();
            });

            it('must keep other existing errors', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }, { other: 'error'}).other).toEqual('error');
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, { other: 'error'}).other).toEqual('error');
            });

            it('must skip existing errors', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, { amount: 'error'}).amount).toEqual('error');
            });

            it('must check multiple attributes', function () {
                validation = validation_helper.validates_numericality_of(['amount', 'other'], { amount: '', other: '' });
                expect(validation.amount).toBeDefined();
                expect(validation.other).toBeDefined();

                validation = validation_helper.validates_numericality_of(['amount', 'other'], { amount: 1, other: 2 });
                expect(validation.amount).toBeUndefined();
                expect(validation.other).toBeUndefined();
            });
        });
    });
});