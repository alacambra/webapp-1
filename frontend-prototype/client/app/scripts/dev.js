(function () {
    'use strict';

    var dependencies = [
        'frontendPrototypeApp',
        'ngMockE2E'
    ];

    angular.module('frontendPrototypeDev', dependencies)

        .config(['$provide',
            function ($provide) {
                // simulate delay for fake_server
                $provide.decorator('$httpBackend', function ($delegate) {
                    var delay = 80; // ms
                    var proxy = function (method, url, data, callback, headers) {
                        var interceptor = function () {
                            var _this = this,
                                _arguments = arguments;
                            // if url doesn't contain a dot it's a REST request so put a delay on it
                            if (url.search(/\./) < 0) {
                                setTimeout(function () {
                                    callback.apply(_this, _arguments);
                                }, delay);
                            } else {
                                callback.apply(_this, _arguments);
                            }
                        };
                        return $delegate.call(this, method, url, data, interceptor, headers);
                    };

                    for (var key in $delegate) {
                        proxy[key] = $delegate[key];
                    }
                    return proxy;
                });
            }])

        .run(['$httpBackend', '$log',
            function ($httpBackend, $log) {
                var baseUrl = 'rest',
                    tasks = [],
                    people = [],
                    pools = [],
                    events = [],
                    communications = [],
                    competences = [],
                    datas = [];

                $.get('mocks/tasks.json', function (data) {
                    tasks = data;
                });

                $.get('mocks/people.json', function (data) {
                    people = data;
                });

                $.get('mocks/pools.json', function (data) {
                    pools = data;
                });

                $.get('mocks/events.json', function (data) {
                    events = data;
                });

                $.get('mocks/communications.json', function (data) {
                    communications = data;
                });

                $.get('mocks/competences.json', function (data) {
                    competences = data;
                });

                $.get('mocks/datas.json', function (data) {
                    datas = data;
                });

                var findById = function (dataset, id) {
                    return _.where(dataset, {"_id": id})[0];
                };


                $httpBackend.whenGET(/.*\.tpl\.html/).passThrough();




                // URI: PUT - /tasks
                $httpBackend.whenPUT(/\/tasks$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, [{_id: "270a8f93-42ce-422d-8b40-96afebd51a11"}]];
                });

                // URI: GET - /tasks
                $httpBackend.whenGET(/\/tasks$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, tasks.slice(1)];
                });

                // URI: GET - /tasks/:id
                $httpBackend.whenGET(/\/tasks\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, findById(tasks, url.match(/\/tasks\/((\w-?)+)$/)[1])];
                });

                // URI: POST - /tasks/:id
                $httpBackend.whenPOST(/\/tasks\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });

                // URI: DELETE - /tasks/:id
                $httpBackend.whenDELETE(/\/tasks\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });




                // URI: PUT - /pools
                $httpBackend.whenPUT(/\/pools$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, [{_id: "f1a4bf0e-0976-4ee1-a3df-b4479a323b5d"}]];
                });

                // URI: GET - /pools
                $httpBackend.whenGET(/\/pools$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, pools.slice(1)];
                });

                // URI: GET - /pools/:id
                $httpBackend.whenGET(/\/pools\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, findById(pools, url.match(/\/pools\/((\w-?)+)$/)[1])];
                });

                // URI: POST - /pools/:id
                $httpBackend.whenPOST(/\/pools\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });

                // URI: DELETE - /pools/:id
                $httpBackend.whenDELETE(/\/pools\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });




                // URI: PUT - /people
                $httpBackend.whenPUT(/\/people$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, [{_id: "5bac5c6f-9517-4b46-beca-438a1e029aaa"}]];
                });

                // URI: GET - /people
                $httpBackend.whenGET(/\/people$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, people.slice(1)];
                });

                // URI: GET - /people/:id
                $httpBackend.whenGET(/\/people\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, findById(people, url.match(/\/people\/((\w-?)+)$/)[1])];
                });

                // URI: POST - /people/:id
                $httpBackend.whenPOST(/\/people\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });

                // URI: DELETE - /people/:id
                $httpBackend.whenDELETE(/\/people\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });




                // URI: PUT - /competences
                $httpBackend.whenPUT(/\/competences$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, [{_id: "5b922f97-7952-4e8b-aab7-4627aa00ae24"}]];
                });

                // URI: GET - /competences
                $httpBackend.whenGET(/\/competences$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, competences.slice(1)];
                });

                // URI: POST - /competences/:id
                $httpBackend.whenPOST(/\/competences\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, findById(competences, url.match(/\/competences\/((\w-?)+)$/)[1])];
                });

                // URI: GET- /competences/:id
                $httpBackend.whenGET(/\/competences\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });

                // URI: DELETE - /competences/:id
                $httpBackend.whenDELETE(/\/competences\/(\w-?)+$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200];
                });




                // URI: GET - /users/:id/tasks
                $httpBackend.whenGET(/\/users\/(\w-?)+\/tasks$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, tasks.slice(1)];
                });

                // URI: GET - /users/:id/pools
                $httpBackend.whenGET(/\/users\/(\w-?)+\/pools$/).respond(function (method, url, data, headers) {
                    console.log(method + ' - ' + url);
                    return [200, pools.slice(1)];
                });

            }]);

}());