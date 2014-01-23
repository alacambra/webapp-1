define(['app',
        'config',
        'backbone_faux_server',
        '../test/fixtures/efforts',
        '../test/fixtures/projects',
        '../test/fixtures/tasks',
        '../test/fixtures/users'
],
function (App, CONFIG, Faux, efforts, projects, tasks, users) {

//    Faux.setLatency(200, 400);

    function log_rest(context) {
        console.log(context.url + ' - ' + context.httpMethod);
        if (context.data) {
            console.log('data: ' + JSON.stringify(context.data));
        }
    }

    var id = 100;
    function generate_id() {
        return id++;
    }

    var NOT_FOUND = 'HTTP/1.1 404 Not Found';
    var NOT_IMPLEMENTED = 'HTTP/1.1 400 Not Implemented';

    var base_url = App.model_base_url('');
    base_url = base_url.substr(0, base_url.length - 1); // cut the last '/' character in base_url

    var url;
    var verb ;



    /* -------- efforts -------- */

    url = '/tasks/:id/efforts';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id) {
        log_rest(context);
        return _.toArray(efforts);
    });

    url = '/tasks/:id/efforts/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id, id) {
        log_rest(context);
        return efforts[id];
    });

    url = '/tasks/:id/efforts';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id) {
        log_rest(context);
        context.data.id = generate_id();
        efforts[context.data.id] = context.data;
        return efforts[context.data.id];
    });

    url = '/tasks/:id/efforts/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id, id) {
        log_rest(context);
        delete efforts[id];
    });

    url = '/tasks/:id/efforts/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, task_id, id) {
        log_rest(context);
        efforts[id] = context.data;
        return efforts[id];
    });


    /* -------- projects -------- */

    url = '/projects';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        return _.toArray(projects);
    });

    url = '/projects/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        return projects[id];
    });

    url = '/projects';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        context.data.id = generate_id();
        projects[context.data.id] = context.data;
        return projects[context.data.id];
    });

    url = '/projects/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        delete projects[id];
    });

    url = '/projects/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        projects[id] = context.data;
        return projects[id];
    });


    /* -------- project tasks -------- */

    url = '/projects/:id/tasks';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        return _.toArray(tasks);
    });


    /* -------- subtasks -------- */

    url = '/tasks/:id/subtasks';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        return _.toArray(tasks);
    });


    /* -------- tasks -------- */

    url = '/tasks';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        return _.toArray(tasks)
    });

    url = '/tasks/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        return tasks[id];
    });

    url = '/tasks';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        context.data.id = generate_id();
        tasks[context.data.id] = context.data;
        return tasks[context.data.id];
    });

    url = '/tasks/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        delete tasks[id];
    });

    url = '/tasks/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        tasks[id] = context.data;
        return tasks[id];
    });


    /* -------- users -------- */

    url = '/users';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        return _.toArray(users);
    });

    url = '/users/:id';
    verb = 'GET';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        return users[id];
    });

    url = '/users';
    verb = 'POST';
    Faux.addRoute(verb + url, base_url + url, verb, function (context) {
        log_rest(context);
        context.data.id = generate_id();
        users[context.data.id] = context.data;
        return users[context.data.id];
    });

    url = '/users/:id';
    verb = 'DELETE';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        delete users[id];
    });

    url = '/users/:id';
    verb = 'PUT';
    Faux.addRoute(verb + url, base_url + url, verb, function (context, id) {
        log_rest(context);
        users[id] = context.data;
        return users[id];
    });
});