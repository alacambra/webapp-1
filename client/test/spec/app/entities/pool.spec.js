define(['app',
        'app/entities/pool', 'moment'],
function(App, Entities, moment) {
    return describe('Entities :: Pool', function() {
        var pool = null,
            pools = null;

        beforeEach(function() {
            pool = new Entities.Pool();
            pools = new Entities.PoolCollection();
        });

        describe('Model', function() {
            it('must have a urlRoot that contains "pool"', function() {
                expect(Entities.Pool.prototype.urlRoot).toContain('pool');
            });

            it('must have default attributes', function() {
                expect(pool.get('name')).toBeNull();
                expect(pool.get('description')).toBeNull();
                expect(pool.get('street')).toBeNull();
                expect(pool.get('houseNumber')).toBeNull();
                expect(pool.get('city')).toBeNull();
                expect(pool.get('zip')).toBeNull();
                expect(pool.get('country')).toBeNull();
                expect(pool.get('email')).toBeNull();
                expect(pool.get('website')).toBeNull();
                expect(pool.get('foundingDate')).toBeNull();
                expect(pool.get('employeeCount')).toBeNull();
                expect(pool.get('phone')).toBeNull();
                expect(pool.get('fax')).toBeNull();
            });

            describe('Validation', function() {
                it('must fail with default attributes', function() {
                    expect(pool.validate(pool.attributes)).toBeDefined();
                });

                describe('name', function() {
                    it('must be set', function() {
                        pool.set('name', 'My Pool');
                        expect(pool.validate(pool.attributes).name).toBeUndefined();
                    });

                    it('must not be too long', function() {
                        pool.set('name', pad('X', 41));
                        expect(pool.validate(pool.attributes).name).toBeDefined();
                    });

                    it('must not be empty', function() {
                        pool.set('name', '');
                        expect(pool.validate(pool.attributes).name).toBeDefined();

                        pool.set('name', ' ');
                        expect(pool.validate(pool.attributes).name).toBeDefined();
                    });
                });

                describe('description', function() {
                    it('must be set', function() {
                        pool.set('description', 'My pool description');
                        expect(pool.validate(pool.attributes).description).toBeUndefined();
                    });


                    it('must not be too long', function() {
                        pool.set('description', pad('X', 1501));
                        expect(pool.validate(pool.attributes).description).toBeDefined();
                    });

                    it('must not be empty', function() {
                        pool.set('description', '');
                        expect(pool.validate(pool.attributes).description).toBeDefined();

                        pool.set('description', ' ');
                        expect(pool.validate(pool.attributes).description).toBeDefined();
                    });
                });

                describe('street', function() {
                    it('must be well formatted', function() {
                        pool.set('street', 'Musterweg');
                        expect(pool.validate(pool.attributes).street).toBeUndefined();

                        pool.set('street', 'Bahnhofstraße');
                        expect(pool.validate(pool.attributes).street).toBeUndefined();

                        pool.set('street', 'Bahnhofstr.');
                        expect(pool.validate(pool.attributes).street).toBeUndefined();

                        pool.set('street', 'In der Schepp');
                        expect(pool.validate(pool.attributes).street).toBeUndefined();

                        pool.set('street', 'Christian-Götz-Str.');
                        expect(pool.validate(pool.attributes).street).toBeUndefined();


                        pool.set('street', '123');
                        expect(pool.validate(pool.attributes).street).toBeDefined();

                        pool.set('street', 'Musterweg 5');
                        expect(pool.validate(pool.attributes).street).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('street', '');
                        expect(pool.validate(pool.attributes).street).toBeUndefined();

                        pool.set('street', ' ');
                        expect(pool.validate(pool.attributes).street).toBeUndefined();
                    });
                });

                describe('city', function() {
                    it('must be well formatted', function() {
                        pool.set('city', 'Darmstadt');
                        expect(pool.validate(pool.attributes).city).toBeUndefined();

                        pool.set('city', 'Groß-Umstadt (Süd)');
                        expect(pool.validate(pool.attributes).city).toBeUndefined();


                        pool.set('city', '64646');
                        expect(pool.validate(pool.attributes).city).toBeDefined();

                        pool.set('city', '64646 Foo Bar');
                        expect(pool.validate(pool.attributes).city).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('city', '');
                        expect(pool.validate(pool.attributes).city).toBeUndefined();

                        pool.set('city', ' ');
                        expect(pool.validate(pool.attributes).city).toBeUndefined();
                    });
                });

                describe('house number', function() {
                    it('must be well formatted', function() {
                        pool.set('houseNumber', '1');
                        expect(pool.validate(pool.attributes).houseNumber).toBeUndefined();

                        pool.set('houseNumber', '123456');
                        expect(pool.validate(pool.attributes).houseNumber).toBeUndefined();

                        pool.set('houseNumber', '12 A');
                        expect(pool.validate(pool.attributes).houseNumber).toBeUndefined();

                        pool.set('houseNumber', '1A');
                        expect(pool.validate(pool.attributes).houseNumber).toBeUndefined();

                        pool.set('houseNumber', '123 ABC');
                        expect(pool.validate(pool.attributes).houseNumber).toBeUndefined();


                        pool.set('houseNumber', 'A');
                        expect(pool.validate(pool.attributes).houseNumber).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('houseNumber', '');
                        expect(pool.validate(pool.attributes).houseNumber).toBeUndefined();

                        pool.set('houseNumber', ' ');
                        expect(pool.validate(pool.attributes).houseNumber).toBeUndefined();
                    });
                });

                describe('zip', function() {
                    it('must be well formatted', function() {
                        pool.set('zip', '64646');
                        expect(pool.validate(pool.attributes).zip).toBeUndefined();

                        pool.set('zip', '01277');
                        expect(pool.validate(pool.attributes).zip).toBeUndefined();

                        pool.set('zip', '01277 ');
                        expect(pool.validate(pool.attributes).zip).toBeUndefined();

                        pool.set('zip', ' 01277 ');
                        expect(pool.validate(pool.attributes).zip).toBeUndefined();

                        pool.set('zip', '01277 ');
                        expect(pool.validate(pool.attributes).zip).toBeUndefined();


                        pool.set('zip', '001122');
                        expect(pool.validate(pool.attributes).zip).toBeDefined();

                        pool.set('zip', '1234567');
                        expect(pool.validate(pool.attributes).zip).toBeDefined();

                        pool.set('zip', '1234');
                        expect(pool.validate(pool.attributes).zip).toBeDefined();

                        pool.set('zip', '12  34');
                        expect(pool.validate(pool.attributes).zip).toBeDefined();

                        pool.set('zip', 'ABCDEF');
                        expect(pool.validate(pool.attributes).zip).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('zip', '');
                        expect(pool.validate(pool.attributes).zip).toBeUndefined();

                        pool.set('zip', ' ');
                        expect(pool.validate(pool.attributes).zip).toBeUndefined();
                    });
                });

                describe('email', function() {
                    it('must be well formatted', function() {
                        pool.set('email', 'alice@riddell.com');
                        expect(pool.validate(pool.attributes).email).toBeUndefined();

                        pool.set('email', 'alice.riddell@mail.foo.bar');
                        expect(pool.validate(pool.attributes).email).toBeUndefined();
                    });


                    it('must not be incomplete', function() {
                        pool.set('email', 'alice');
                        expect(pool.validate(pool.attributes).email).toBeDefined();

                        pool.set('email', 'alice@riddell');
                        expect(pool.validate(pool.attributes).email).toBeDefined();

                        pool.set('email', 'alice.com');
                        expect(pool.validate(pool.attributes).email).toBeDefined();

                        pool.set('email', 'alice.com@riddell');
                        expect(pool.validate(pool.attributes).email).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('email', '');
                        expect(pool.validate(pool.attributes).email).toBeUndefined();

                        pool.set('email', ' ');
                        expect(pool.validate(pool.attributes).email).toBeUndefined();
                    });
                });

                describe('website', function() {
                    it('must be well formatted', function() {
                        pool.set('website', 'http://www.test.de');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'https://www.test.de');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'http://test.de');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'https://www.test.de');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'http://www.test.uk.co');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'https://www.test.company.com');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'https://test.company.com');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'http://www.test123.de');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'http://www.test123.foo456.de');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'http://www.test123.foo456.de/');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'http://www.test123.foo456.de/test');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'https://www.test.de/index.html');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'https://www.test.de/index.html?foo=1&bar=abc');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', 'https://www.test.de/foo/bar/index.html?foo=1&bar=abc');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();


                        pool.set('website', 'test');
                        expect(pool.validate(pool.attributes).website).toBeDefined();

                        pool.set('website', 'test.de');
                        expect(pool.validate(pool.attributes).website).toBeDefined();

                        pool.set('website', 'www.test.de');
                        expect(pool.validate(pool.attributes).website).toBeDefined();

                        pool.set('website', 'https://www.test.loremipsum');
                        expect(pool.validate(pool.attributes).website).toBeDefined();

                        pool.set('website', 'https://www.test?foo=1&bar=abc');
                        expect(pool.validate(pool.attributes).website).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('website', '');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();

                        pool.set('website', ' ');
                        expect(pool.validate(pool.attributes).website).toBeUndefined();
                    });
                });

                describe('phone', function() {
                    it('must be well formatted', function() {
                        pool.set('phone', '+49 6151 39115');
                        expect(pool.validate(pool.attributes).phone).toBeUndefined();

                        pool.set('phone', '+496151391150');
                        expect(pool.validate(pool.attributes).phone).toBeUndefined();

                        pool.set('phone', '+49 6151 39115-0');
                        expect(pool.validate(pool.attributes).phone).toBeUndefined();

                        pool.set('phone', '+49 6151 39115-01');
                        expect(pool.validate(pool.attributes).phone).toBeUndefined();


                        pool.set('phone', 'ABC');
                        expect(pool.validate(pool.attributes).phone).toBeDefined();

                        pool.set('phone', '+493012');
                        expect(pool.validate(pool.attributes).phone).toBeDefined();

                        pool.set('phone', '49 6151 39115');
                        expect(pool.validate(pool.attributes).phone).toBeDefined();

                        pool.set('phone', '49 6151 39115 A');
                        expect(pool.validate(pool.attributes).phone).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('phone', '');
                        expect(pool.validate(pool.attributes).phone).toBeUndefined();

                        pool.set('phone', ' ');
                        expect(pool.validate(pool.attributes).phone).toBeUndefined();
                    });
                });

                describe('fax', function() {
                    it('must be well formatted', function() {
                        pool.set('fax', '+49 6151 39115');
                        expect(pool.validate(pool.attributes).fax).toBeUndefined();

                        pool.set('fax', '+496151391150');
                        expect(pool.validate(pool.attributes).fax).toBeUndefined();

                        pool.set('fax', '+49 6151 39115-0');
                        expect(pool.validate(pool.attributes).fax).toBeUndefined();

                        pool.set('fax', '+49 6151 39115-01');
                        expect(pool.validate(pool.attributes).fax).toBeUndefined();


                        pool.set('fax', 'ABC');
                        expect(pool.validate(pool.attributes).fax).toBeDefined();

                        pool.set('fax', '+493012');
                        expect(pool.validate(pool.attributes).fax).toBeDefined();

                        pool.set('fax', '49 6151 39115');
                        expect(pool.validate(pool.attributes).fax).toBeDefined();

                        pool.set('fax', '49 6151 39115 A');
                        expect(pool.validate(pool.attributes).fax).toBeDefined();
                    });

                    it('may be empty', function() {
                        pool.set('fax', '');
                        expect(pool.validate(pool.attributes).fax).toBeUndefined();

                        pool.set('fax', ' ');
                        expect(pool.validate(pool.attributes).fax).toBeUndefined();
                    });
                });

                describe('founding date', function() {
                    it('may be empty', function() {
                        pool.set('foundingDate', '');
                        expect(pool.validate(pool.attributes).foundingDate).toBeUndefined();
                    });

                    it('may be max. 100 years ago', function() {
                        pool.set('foundingDate', 0);
                        expect(pool.validate(pool.attributes).foundingDate).toBeUndefined();

                        pool.set('foundingDate', 1);
                        expect(pool.validate(pool.attributes).foundingDate).toBeUndefined();

                        pool.set('foundingDate', -1);
                        expect(pool.validate(pool.attributes).foundingDate).toBeUndefined();

                        pool.set('foundingDate', moment().subtract('years', 100).unix());
                        expect(pool.validate(pool.attributes).foundingDate).toBeUndefined();

                        pool.set('foundingDate', moment().unix());
                        expect(pool.validate(pool.attributes).foundingDate).toBeUndefined();

                        pool.set('foundingDate', moment().unix() - 1);
                        expect(pool.validate(pool.attributes).foundingDate).toBeUndefined();

                        pool.set('foundingDate', moment().subtract('years', 101).unix());
                        expect(pool.validate(pool.attributes).foundingDate).toBeDefined();
                    });

                    it('must not be in the future', function() {
                        pool.set('foundingDate', moment().unix() + 1);
                        expect(pool.validate(pool.attributes).foundingDate).toBeDefined();
                    });
                });
            });
        });

        describe('Collection', function() {
            it('must have a url that contains "pool"', function() {
                expect(Entities.PoolCollection.prototype.url).toContain('pool');
            });
        });

        describe('API', function () {
            it('Should return a specified list of pools', function () {
                var response = null;
                var pools = new Entities.PoolCollection();

                spyOn(Entities.PoolCollection.prototype, 'fetch').andCallFake(function (options) {
                    options.success(pools);
                });

                runs(function () {
                    $.when(App.request('pool:entities')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'pool:entities\' with no parameter', 100);

                runs(function () {
                    expect(response).toBe(pools);
                });
            });

            it('Should return a new pool', function () {
                var response = null;

                runs(function () {
                    $.when(App.request('pool:entity')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'pool:entity\' with no parameter', 100);

                runs(function () {
                    expect(response.get('id')).toBe(null);
                });
            });

            it('Should return specified pool', function () {
                var response = null;
                var pool = new Entities.Pool({ id: 1 });

                runs(function () {
                    request = $.when(App.request('pool:entity', pool)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'pool:entity\' with specified pool as parameter', 100);

                runs(function () {
                    expect(response).toBe(pool);
                });
            });

            it('Should return pool with specified pool id', function () {
                var response = null;
                var id = 1;
                var pool = new Entities.Pool({
                    id: id
                });

                spyOn(Entities.Pool.prototype, 'fetch').andCallFake(function (options) {
                    options.success(pool);
                });

                runs(function () {
                    $.when(App.request('pool:entity', id)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'pool:entity\' with specified id as parameter', 100);

                runs(function () {
                    expect(response).toBe(pool);
                });
            });
        });
    });
});