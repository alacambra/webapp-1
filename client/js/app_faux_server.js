define(['app',
        'config',
        'backbone_faux_server',
        '../test/fixtures/efforts',
        '../test/fixtures/pools',
        '../test/fixtures/projects',
        '../test/fixtures/services',
        '../test/fixtures/tasks',
        '../test/fixtures/users'
],
function (App, CONFIG, Faux, efforts, pools, projects, services, tasks, users) {

//    Faux.setLatency(200, 400);

    function log_rest(context, info, type) {
        if (!CONFIG.rest.faux.log_rest) return;

        if (_.isString(context.data)) context.data = JSON.parse(context.data);

        var msg = info ? info + '\n' : '';
        msg += context.httpMethod + ': ' + context.url;
        msg += context.data ? '\ndata = ' + JSON.stringify(context.data, null, 4) : '';

        console[type || 'log'](msg);
    }

    var id = 100;
    function generate_id() {
        return id++;
    }

    var server_null_value = 99999999999999;
    function convert_to_server_null_value(date) {
        return _.isNumber(date) ? date : server_null_value;
    }

    function convert_to_server_null_value_negative(date) {
        return _.isNumber(date) ? date : -server_null_value;
    }

    var NOT_FOUND = 'HTTP/1.1 404 Not Found';
    var NOT_IMPLEMENTED = 'HTTP/1.1 400 Not Implemented';

    var base_url = App.model_base_url('');



    /* -------- default -------- */

    Faux.setDefaultHandler(function(context) {
        log_rest(context, 'A handler for the following request is not defined.', 'warn');

        return NOT_FOUND;
    });


    /* -------- efforts -------- */

    Faux.get(base_url + 'tasks/:task_id/efforts', function(context, task_id) {
        log_rest(context);
        return _.filter(_.toArray(efforts), function(effort) { return effort.taskId == task_id });
    });

    Faux.get(base_url + 'tasks/:task_id/efforts/:id', function(context, task_id, id) {
        log_rest(context);
        return efforts[id];
    });

    Faux.post(base_url + 'tasks/:task_id/efforts', function(context, task_id) {
        log_rest(context);
        context.data.id = generate_id();
        context.data.date = convert_to_server_null_value(context.data.date);
        efforts[context.data.id] = context.data;
        efforts[context.data.id]['taskId'] = task_id;
        return efforts[context.data.id];
    });

    Faux.del(base_url + 'tasks/:task_id/efforts/:id', function(context, task_id, id) {
        log_rest(context);
        delete efforts[id];
    });

    Faux.put(base_url + 'tasks/:task_id/efforts/:id', function(context, task_id, id) {
        log_rest(context);
        context.data.date = convert_to_server_null_value(context.data.date);
        efforts[id] = context.data;
        return efforts[id];
    });


    /* -------- pools -------- */

    Faux.get(base_url + 'pools', function (context) {
        log_rest(context);
        return _.toArray(pools);
    });

    Faux.get(base_url + 'pools/:id', function (context, id) {
        log_rest(context);
        return pools[id];
    });

    Faux.post(base_url + 'pools', function (context) {
        log_rest(context);
        context.data.id = generate_id();
        pools[context.data.id] = context.data;
        return pools[context.data.id];
    });

    Faux.del(base_url + 'pools/:id', function (context, id) {
        log_rest(context);
        delete pools[id];
    });

    Faux.put(base_url + 'pools/:id', function (context, id) {
        log_rest(context);
        pools[id] = context.data;
        return pools[id];
    });

    Faux.patch(base_url + 'pools/:id', function (context, id) {
        log_rest(context);
        _.extend(pools[id], context.data);
        return pools[id];
    });


    /* -------- projects -------- */

    Faux.get(base_url + 'projects', function(context) {
        log_rest(context);
        return _.toArray(projects);
    });

    Faux.get(base_url + 'projects/:id', function(context, id) {
        log_rest(context);
        return projects[id];
    });

    Faux.post(base_url + 'projects', function(context) {
        log_rest(context);
        context.data.id = generate_id();
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        projects[context.data.id] = context.data;
        return projects[context.data.id];
    });

    Faux.del(base_url + 'projects/:id', function(context, id) {
        log_rest(context);
        delete projects[id];
    });

    Faux.put(base_url + 'projects/:id', function(context, id) {
        log_rest(context);
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        projects[id] = context.data;
        return projects[id];
    });

    Faux.patch(base_url + 'projects/:id', function(context, id) {
        log_rest(context);
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        _.extend(projects[id], context.data);
        return projects[id];
    });


    /* -------- project tasks -------- */

    Faux.get(base_url + 'projects/:project_id/tasks', function(context, project_id) {
        log_rest(context);
        return _.filter(_.toArray(tasks), function(task) { return task.project && task.project.id == project_id });
    });


    /* -------- services -------- */

    Faux.get(base_url + 'services', function (context) {
        log_rest(context);
        return _.toArray(services);
    });

    Faux.get(base_url + 'services/:id', function (context, id) {
        log_rest(context);
        return services[id];
    });

    Faux.post(base_url + 'services', function (context) {
        log_rest(context);
        context.data.id = generate_id();
        services[context.data.id] = context.data;
        return services[context.data.id];
    });

    Faux.del(base_url + 'services/:id', function (context, id) {
        log_rest(context);
        delete services[id];
    });

    Faux.put(base_url + 'services/:id', function (context, id) {
        log_rest(context);
        services[id] = context.data;
        return services[id];
    });

    Faux.patch(base_url + 'services/:id', function (context, id) {
        log_rest(context);
        _.extend(services[id], context.data);
        return services[id];
    });


    /* -------- tasks -------- */

    function task_add_assignee(data) {
        var assignee_id = data.assignee_id;
        delete data.assignee_id;
        data.assignee = users[assignee_id];
    }

    Faux.get(base_url + 'tasks', function (context) {
        log_rest(context);
        return _.filter(_.toArray(tasks), function(task) { return !task.parent_id });
    });

    Faux.get(base_url + 'tasks/:id', function (context, id) {
        log_rest(context);
        return tasks[id];
    });

    Faux.post(base_url + 'tasks', function (context) {
        log_rest(context);

        if (context.data.project) context.data.project.title = projects[context.data.project.id].title;

        context.data.id = generate_id();
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        tasks[context.data.id] = context.data;
        return tasks[context.data.id];
    });

    Faux.del(base_url + 'tasks/:id', function (context, id) {
        log_rest(context);
        delete tasks[id];
    });

    Faux.put(base_url + 'tasks/:id', function (context, id) {
        log_rest(context);
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        tasks[id] = context.data;
        return tasks[id];
    });

    Faux.patch(base_url + 'tasks/:id', function (context, id) {
        log_rest(context);
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        _.extend(tasks[id], context.data);
        return tasks[id];
    });


    /* -------- tasks subtasks -------- */

    Faux.get(base_url + 'tasks/:task_id/subtasks', function (context, task_id) {
        log_rest(context);
        return _.filter(_.toArray(tasks), function(task) { return task.parent_id == task_id });
    });


    /* -------- tasks associations - projects -------- */

    Faux.post(base_url + 'tasks/in/project/:project_id', function (context, project_id) {
        log_rest(context);

        context.data.id = generate_id();
        context.data.project = {
            id: project_id,
            title: projects[project_id].title
        };
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        tasks[context.data.id] = context.data;
        return tasks[context.data.id];
    });

    Faux.put(base_url + 'tasks/:task_id/from/project/:source_project_id/to/:target_project_id', function (context, task_id, source_project_id, target_project_id) {
        log_rest(context);

        if (_.isUndefined(projects[target_project_id])) {
            return NOT_FOUND;
        }

        tasks[task_id].project = {
            id: target_project_id,
            title: projects[target_project_id].title
        };

        return tasks[task_id];
    });

    Faux.put(base_url + 'tasks/:task_id/in/project/:target_project_id', function (context, task_id, target_project_id) {
        log_rest(context);

        if (_.isUndefined(projects[target_project_id])) {
            return NOT_FOUND;
        }

        tasks[task_id].project = {
            id: target_project_id,
            title: projects[target_project_id].title
        };

        return tasks[task_id];
    });


    /* -------- tasks associations - tasks -------- */

    Faux.post(base_url + 'tasks/as/subtask/:task_id', function (context, task_id) {
        log_rest(context);

        context.data.id = generate_id();
        context.data.parent_id = task_id;
        context.data.startDate = convert_to_server_null_value(context.data.startDate);
        context.data.endDate = convert_to_server_null_value_negative(context.data.endDate);
        tasks[context.data.id] = context.data;
        return tasks[context.data.id];
    });

    Faux.put(base_url + 'tasks/:task_id/from/task/:source_task_id/to/:target_task_id', function (context, task_id, source_task_id, target_task_id) {
        log_rest(context);

        if (_.isUndefined(tasks[target_task_id])) {
            return NOT_FOUND;
        }

        tasks[task_id].parent_id = target_task_id;

        return tasks[task_id];
    });

    Faux.put(base_url + 'tasks/:task_id/in/task/:target_task_id', function (context, task_id, target_task_id) {
        log_rest(context);

        if (_.isUndefined(tasks[target_task_id])) {
            return NOT_FOUND;
        }

        tasks[task_id].parent_id = target_task_id;

        return tasks[task_id];
    });


    /* -------- tasks associations - users -------- */

    Faux.put(base_url + 'tasks/:task_id/to/user/:target_user_id', function (context, task_id, target_user_id) {
        log_rest(context);

        if (_.isUndefined(users[target_user_id])) {
            return NOT_FOUND;
        }

        var task = tasks[task_id];
        task.assignee_id = target_user_id;

        task_add_assignee(task);

        return task;
    });


    /* -------- users -------- */

    Faux.get(base_url + 'users', function (context) {
        log_rest(context);
        return _.toArray(users);
    });

    Faux.get(base_url + 'users/:id', function (context, id) {
        log_rest(context);
        return users[id];
    });

    Faux.post(base_url + 'users', function (context) {
        log_rest(context);
        context.data.id = generate_id();
        context.data.birthDate = convert_to_server_null_value(context.data.birthDate);
        users[context.data.id] = context.data;
        return users[context.data.id];
    });

    Faux.del(base_url + 'users/:id', function (context, id) {
        log_rest(context);
        delete users[id];
    });

    Faux.put(base_url + 'users/:id', function (context, id) {
        log_rest(context);
        context.data.birthDate = convert_to_server_null_value(context.data.birthDate);
        users[id] = context.data;
        return users[id];
    });

    Faux.patch(base_url + 'users/:id', function (context, id) {
        log_rest(context);
        context.data.birthDate = convert_to_server_null_value(context.data.birthDate);
        _.extend(users[id], context.data);
        return users[id];
    });


    /* -------- user sessions -------- */

    Faux.post(base_url + 'user_sessions', function (context) {
        log_rest(context);
        App.set_credentials('foo:bar');
        return users[0];
    });

});