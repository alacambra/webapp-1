define(['app/validation_helper'], function (validation_helper) {
    return describe('App :: ValidationHelper', function () {
        var validation;

        describe('validates_confirmation_of', function () {
            it('must validate confirmation', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: '', passwordConfirmation: '' }).password).toBeUndefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: 'a' }).password).toBeUndefined();
            });

            it('must invalidate wrong confirmation', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: '' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: 'b' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { password: '', passwordConfirmation: 'b' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { passwordConfirmation: 'a' }).password).toBeDefined();
            });

            it('must optionally conditionally skip validation', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }, {}, { if: false }).password).toBeUndefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: 'a' }, {}, { if: false }).password).toBeUndefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }, {}, { if: true }).password).toBeDefined();
                expect(validation_helper.validates_confirmation_of('password', { password: 'a', passwordConfirmation: 'a' }, {}, { if: true }).password).toBeUndefined();
            });

            it('must optionally use specific error message', function () {
                expect(validation_helper.validates_confirmation_of('password', { password: 'a' }, {}, { message: 'gotcha' }).password).toEqual('gotcha');
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


        describe('validates_exclusion_of', function () {
            it('must validate exclusion in array', function () {
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: [''] }).name).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['alice'] }).name).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Bob'] }).name).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Bob', 'Charly'] }).name).toBeUndefined();
            });

            it('must validate exclusion in range', function () {
                expect(validation_helper.validates_exclusion_of('count', { count: 5 }, {}, { in: { min: 10, max: 100 } }).count).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('count', { count: 500 }, {}, { in: { min: 10, max: 100 } }).count).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('count', { count: 9 }, {}, { in: { min: 10, max: 100 } }).count).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('count', { count: 101 }, {}, { in: { min: 10, max: 100 } }).count).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('count', { count: -1 }, {}, { in: { min: 10, max: 100 } }).count).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('count', { count: -11 }, {}, { in: { min: -10, max: 10 } }).count).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('count', { count: 11 }, {}, { in: { min: -10, max: 10 } }).count).toBeUndefined();
            });

            it('must invalidate exclusion hit in array', function () {
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Alice'] }).name).toBeDefined();
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['A', 'Alice', 'Bob'] }).name).toBeDefined();
                expect(validation_helper.validates_exclusion_of('name', { name: '' }, {}, { in: [''] }).name).toBeDefined();
            });

            it('must invalidate exclusion hit in range', function () {
                expect(validation_helper.validates_exclusion_of('count', { count: 15 }, {}, { in: { min: 10, max: 100 } }).count).toBeDefined();
                expect(validation_helper.validates_exclusion_of('count', { count: 10 }, {}, { in: { min: 10, max: 100 } }).count).toBeDefined();
                expect(validation_helper.validates_exclusion_of('count', { count: 100 }, {}, { in: { min: 10, max: 100 } }).count).toBeDefined();
                expect(validation_helper.validates_exclusion_of('count', { count: 0 }, {}, { in: { min: -10, max: 10 } }).count).toBeDefined();
            });

            it('must optionally conditionally skip validation', function () {
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Bob'], if: false }).name).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Alice'], if: false }).name).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Bob'], if: true }).name).toBeUndefined();
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Alice'], if: true }).name).toBeDefined();
            });

            it('must optionally use specific error message', function () {
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: ['Alice'], message: 'gotcha' }).name).toEqual('gotcha');
            });

            it('must keep other existing errors', function () {
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, { other: 'error'}, { in: ['a'] }).other).toEqual('error');
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, { other: 'error'}, { in: ['Alice'] }).other).toEqual('error');
            });

            it('must skip existing errors', function () {
                expect(validation_helper.validates_exclusion_of('name', { name: 'Alice' }, { name: 'error'}, { in: ['Alice'] }).name).toEqual('error');
            });

            it('must check multiple attributes', function () {
                validation = validation_helper.validates_exclusion_of(['first', 'last'], { first: 'Alice', last: 'Riddell' }, {}, { in: ['Bob'] });
                expect(validation.first).toBeUndefined();
                expect(validation.last).toBeUndefined();

                validation = validation_helper.validates_exclusion_of(['first', 'last'], { first: 'Alice', last: 'Riddell' }, {}, { in: ['Bob', 'Alice', 'Riddell'] });
                expect(validation.first).toBeDefined();
                expect(validation.last).toBeDefined();
            });

            it('must throw exceptions', function () {
                expect(function() { validation_helper.validates_exclusion_of('name', { name: 'Alice' }) }).toThrow(new Error('options.in must be defined'));
                expect(function() { validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: {} }) }).toThrow(new Error('options.in must define min and max'));
                expect(function() { validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: { min: 0 } }) }).toThrow(new Error('options.in must define min and max'));
                expect(function() { validation_helper.validates_exclusion_of('name', { name: 'Alice' }, {}, { in: { max: 0 } }) }).toThrow(new Error('options.in must define min and max'));
            });
        });


        describe('validates_numericality_of', function () {
            it('must validate numeric values', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 1.23 }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 0 }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: -10 }).amount).toBeUndefined();
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

            it('must optionally validate only integers', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }, {}, { only_integer: true }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 1.2 }, {}, { only_integer: true }).amount).toBeDefined();
            });

            it('must optionally conditionally skip validation', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { if: false }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }, {}, { if: false }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { if: true }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }, {}, { if: true }).amount).toBeUndefined();
            });

            it('must optionally allow blank values', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { allow_blank: true }).amount).toBeUndefined();
            });

            it('must optionally use specific error message', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { message: 'gotcha' }).amount).toEqual('gotcha');
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