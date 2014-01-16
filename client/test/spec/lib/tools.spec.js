define([], function() {
    return describe('Lib :: Tools', function() {
        describe('is_empty', function() {
            it('should detect empty params', function() {
                expect(is_empty()).toBeTruthy();
            });
            it('should detect false', function() {
                expect(is_empty(false)).toBeTruthy();
            });
            it('should detect empty string', function() {
                expect(is_empty('')).toBeTruthy();
            });
            it('should detect null', function() {
                expect(is_empty(null)).toBeTruthy();
            });
            it('should detect undefined', function() {
                expect(is_empty(undefined)).toBeTruthy();
            });
            it('should detect empty array', function() {
                expect(is_empty([])).toBeTruthy();
            });
            it('should detect empty object', function() {
                expect(is_empty({})).toBeTruthy();
            });

            it('should detect true', function() {
                expect(is_empty(true)).toBeFalsy();
            });
            it('should detect 0', function() {
                expect(is_empty(0)).toBeFalsy();
            });
            it('should detect number', function() {
                expect(is_empty(5)).toBeFalsy();
            });
            it('should detect whitespace', function() {
                expect(is_empty(' ')).toBeFalsy();
            });
            it('should detect array with null value', function() {
                expect(is_empty([null])).toBeFalsy();
            });
            it('should detect array with value(s)', function() {
                expect(is_empty([1])).toBeFalsy();
            });
            it('should detect object with value(s)', function() {
                expect(is_empty({ a: 1 })).toBeFalsy();
            });
            it('should detect object with null value', function() {
                expect(is_empty({ a: null })).toBeFalsy();
            });
        });

        describe('is_blank', function() {
            it('should detect empty params', function() {
                expect(is_blank()).toBeTruthy();
            });
            it('should detect false', function() {
                expect(is_blank(false)).toBeTruthy();
            });
            it('should detect empty string', function() {
                expect(is_blank('')).toBeTruthy();
            });
            it('should detect whitespace string', function() {
                expect(is_blank(' ')).toBeTruthy();
            });
            it('should detect whitespace string (\n)', function() {
                expect(is_blank("\n")).toBeTruthy();
            });
            it('should detect null value', function() {
                expect(is_blank(null)).toBeTruthy();
            });
            it('should detect undefined', function() {
                expect(is_blank(undefined)).toBeTruthy();
            });
            it('should detect empty array', function() {
                expect(is_blank([])).toBeTruthy();
            });
            it('should detect empty object', function() {
                expect(is_blank({})).toBeTruthy();
            });

            it('should detect true', function() {
                expect(is_blank(true)).toBeFalsy();
            });
            it('should detect non-empty string', function() {
                expect(is_blank('a')).toBeFalsy();
            });
            it('should detect numbers', function() {
                expect(is_blank(1)).toBeFalsy();
            });
            it('should detect array with null value', function() {
                expect(is_empty([null])).toBeFalsy();
            });
            it('should detect array with value(s)', function() {
                expect(is_empty([1])).toBeFalsy();
            });
            it('should detect object with value(s)', function() {
                expect(is_empty({ a: 1 })).toBeFalsy();
            });
            it('should detect object with value', function() {
                expect(is_empty({ a: null })).toBeFalsy();
            });
        });
    });
});