define(['app/validation_helper'], function (validation_helper) {
    return describe('App :: ValidationHelper', function () {
        return describe('validates_numericality_of', function () {
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
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, {}, { if: (1 === 2) }).amount).toBeUndefined();
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
                expect(validation_helper.validates_numericality_of('amount', { amount: 1 }, { other: 'error'}).other).toBeDefined();
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, { other: 'error'}).other).toBeDefined();
            });

            it('must skip existing errors', function () {
                expect(validation_helper.validates_numericality_of('amount', { amount: '' }, { amount: 'error'}).amount).toEqual('error');
            });

            it('must check multiple attributes', function () {
                expect(validation_helper.validates_numericality_of(['amount', 'other'], { amount: '', other: '' }).amount).toBeDefined();
                expect(validation_helper.validates_numericality_of(['amount', 'other'], { amount: '', other: '' }).other).toBeDefined();

                expect(validation_helper.validates_numericality_of(['amount', 'other'], { amount: 1, other: 2 }).amount).toBeUndefined();
                expect(validation_helper.validates_numericality_of(['amount', 'other'], { amount: 1, other: 2 }).other).toBeUndefined();
            });
        });
    });
});