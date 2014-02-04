define(['app',
        'app/entities/service'],
function(App, Entities) {
    return describe('Entities :: Service', function() {
        var service = null,
            services = null;

        beforeEach(function() {
            service = new Entities.Service({ id: 2 });
            services = new Entities.ServiceCollection();
        });

        describe('Model', function() {
            it('must have a urlRoot that contains "service"', function() {
                expect(Entities.Service.prototype.urlRoot).toContain('service');
            });

            it('must have default attributes', function() {
                expect(service.get('name')).toBeNull();
                expect(service.get('description')).toBeNull();
            });

            describe('Validation', function() {
                it('must fail with default attributes', function() {
                    expect(service.validate(service.attributes)).toBeDefined();
                });

                describe('name', function() {
                    it('must be set', function() {
                        service.set('name', 'Alice');
                        expect(service.validate(service.attributes).name).toBeUndefined();
                    });


                    it('must not be empty', function() {
                        service.set('name', '');
                        expect(service.validate(service.attributes).name).toBeDefined();

                        service.set('name', ' ');
                        expect(service.validate(service.attributes).name).toBeDefined();
                    });


                    it('must not be too long', function() {
                        service.set('name', pad('X', 40));
                        expect(service.validate(service.attributes).name).toBeUndefined();

                        service.set('name', pad('X', 41));
                        expect(service.validate(service.attributes).name).toBeDefined();
                    });
                });

                describe('description', function() {
                    it('must not be too long', function() {
                        service.set('description', pad('X', 500));
                        expect(service.validate(service.attributes).description).toBeUndefined();

                        service.set('description', pad('X', 501));
                        expect(service.validate(service.attributes).description).toBeDefined();
                    });
                });
            });
        });

        describe('Collection', function() {
            it('must have a url that contains "service"', function() {
                expect(Entities.ServiceCollection.prototype.url).toContain('service');
            });
        });

        describe('API', function () {
            it('Should return specified list of services', function () {
                var response = null;
                var services = new Entities.ServiceCollection();

                spyOn(Entities.ServiceCollection.prototype, 'fetch').andCallFake(function (options) {
                    options.success(services);
                });

                runs(function () {
                    $.when(App.request('service:entities')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'service:entities\' with no parameter', 100);

                runs(function () {
                    expect(response).toBe(services);
                });
            });

            it('Should return a new service', function () {
                var response = null;

                runs(function () {
                    $.when(App.request('service:entity')).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'service:entity\' with no parameter', 100);

                runs(function () {
                    expect(response.get('id')).toBe(null);
                });
            });

            it('Should return specified service', function () {
                var response = null;
                var service = new Entities.Service({ id: 1 });

                runs(function () {
                    $.when(App.request('service:entity', service)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'service:entity\' with specified service as parameter', 100);

                runs(function () {
                    expect(response).toBe(service);
                });
            });

            it('Should return service with specified service id', function () {
                var response = null;
                var id = 1;
                var service = new Entities.Service({ id: id });

                spyOn(Entities.Service.prototype, 'fetch').andCallFake(function (options) {
                    options.success(service);
                });

                runs(function () {
                    $.when(App.request('service:entity', id)).done(function (_response) {
                        response = _response;
                    });
                });

                waitsFor(function () {
                    return !_.isNull(response);
                }, 'The response of \'service:entity\' with id as parameter', 100);

                runs(function () {
                    expect(response).toBe(service);
                });
            });
        });
    });
});