define(['app',
        'config',
        'backbone_faux_server'],
function (App, CONFIG, Faux) {

//    Faux.setLatency(200, 400);

    function logRest(context) {
        console.log(context.url + ' - ' + context.httpMethod);
        if (context.data) {
            console.log('data: ' + JSON.stringify(context.data));
        }
    }

    function asArray(obj) {
        return $.map(obj, function(value, index) {
            return [value];
        });
    }

    var id = 100;
    function generateId() {
        return id++;
    }

    var NOT_FOUND = 'HTTP/1.1 404 Not Found';
    var NOT_IMPLEMENTED = 'HTTP/1.1 400 Not Implemented';

    var base_url = App.model_base_url('');
    base_url = base_url.substr(0, base_url.length - 1); // cut the last '/' character in base_url
    var url = '';
    var verb = '';

    var tasks = {
        0: {
            id: 0,
            title: 'Task0',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            startDate: 1387206224,
            progress: 0.8,
            effort: 88,
            project: {
                id: 0,
                title: 'Project0'
            }
        },
        1: {
            id: 1,
            title: 'Task1',
            description: 'Lorem ipsum',
            startDate: 1387206224,
            project: {
                id: 0,
                title: 'Project0'
            }
        },
        2: {
            id: 2,
            title: 'Task2',
            startDate: 1387206224,
            progress: 1
        },
        3: {
            id: 3,
            title: 'Task3',
            startDate: 1387206224,
            progress: 0.2
        },
        4: {
            id: 4,
            title: 'Task4',
            startDate: 1387206224,
            progress: 0.5
        }
    };

    var projects = {
        0: {
            id: 0,
            title: 'Project0',
            description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
            startDate: 1387206224,
            status: 2
        },
        1: {
            id: 1,
            title: 'Project1',
            startDate: 1387206224
        },
        2: {
            id: 2,
            title: 'Project2',
            description: 'Lorem ipsum'
        },
        3: {
            id: 3,
            title: 'Project3',
            status: 1
        },
        4: {
            id: 4,
            title: 'Project4',
            status: 2
        }
    };

    var users = {
        0: {
            id: 0,
            firstName: 'Anna',
            lastName: 'Atlas',
            birthDate: 1387206224,
            email: 'anna@atlas.com'
        },
        1: {
            id: 1,
            firstName: 'Bob',
            lastName: 'Bubble',
            birthDate: 1387206224,
            email: 'bob@bubble.com'
        },
        2: {
            id: 2,
            firstName: 'Charlie',
            lastName: 'Chaos',
            email: 'charlie@chaos.com'
        },
        3: {
            id: 3,
            firstName: 'Django',
            lastName: 'Delta',
            birthDate: 1387206224
        },
        4: {
            id: 4,
            firstName: 'Erik',
            lastName: 'Electric'
        }
    };

    var efforts = {
        0: {
            id: 0,
            date: 1387206224,
            time: 20,
            comment: 'Comment of Effort 0'
        },
        1: {
            id: 1,
            date: 1387206224,
            time: 25,
            comment: 'Comment of Effort 1'
        },
        2: {
            id: 2,
            date: 1387206224,
            time: 75,
            comment: 'Comment of Effort 2'
        },
        3: {
            id: 3,
            date: 1387206224,
            time: 240,
            comment: 'Comment of Effort 3'
        },
        4: {
            id: 4,
            date: 1387206224,
            time: 120,
            comment: 'Comment of Effort 4'
        }
    };

    /* -------- tasks -------- */

    url = '/tasks';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return asArray(tasks)
    });

    url = '/tasks/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        return tasks[id];
    });

    url = '/tasks';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        context.data.id = generateId();
        tasks[context.data.id] = context.data;
        return tasks[context.data.id];
    });

    url = '/tasks/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        delete tasks[id];
    });

    url = '/tasks/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        tasks[id] = context.data;
        return tasks[id];
    });

    /* -------- efforts -------- */

    url = '/tasks/:id/efforts';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id) {
        logRest(context);
        return asArray(efforts);
    });

    url = '/tasks/:id/efforts/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id, id) {
        logRest(context);
        return efforts[id];
    });

    url = '/tasks/:id/efforts';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id) {
        logRest(context);
        context.data.id = generateId();
        efforts[context.data.id] = context.data;
        return efforts[context.data.id];
    });

    url = '/tasks/:id/efforts/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id, id) {
        logRest(context);
        delete efforts[id];
    });

    url = '/tasks/:id/efforts/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id, id) {
        logRest(context);
        efforts[id] = context.data;
        return efforts[id];
    });

    /* -------- projects -------- */

    url = '/projects';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return asArray(projects);
    });

    url = '/projects/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        return projects[id];
    });

    url = '/projects';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        context.data.id = generateId();
        projects[context.data.id] = context.data;
        return projects[context.data.id];
    });

    url = '/projects/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        delete projects[id];
    });

    url = '/projects/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        projects[id] = context.data;
        return projects[id];
    });

    /* -------- users -------- */

    url = '/users';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return asArray(users);
    });

    url = '/users/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        return users[id];
    });

    url = '/users';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        context.data.id = generateId();
        users[context.data.id] = context.data;
        return users[context.data.id];
    });

    url = '/users/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        delete users[id];
    });

    url = '/users/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        logRest(context);
        users[id] = context.data;
        return users[id];
    });

    /* -------- project members -------- */

    url = '/projects/:id/members';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/projects/:id/members/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/projects/:id/members/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/projects/:id/members/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    /* -------- project tasks -------- */

    url = '/projects/:id/tasks';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return asArray(tasks);
    });

    url = '/projects/:id/tasks/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/projects/:id/tasks/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/projects/:id/tasks/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    /* -------- contacts -------- */

    url = '/users/:id/contacts';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/users/:id/contacts/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/users/:id/contacts/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

    url = '/users/:id/contacts/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        logRest(context);
        return NOT_IMPLEMENTED;
    });

});