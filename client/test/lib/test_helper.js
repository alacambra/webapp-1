function find_missing_translation($view) {
    var match = $view.text().match(/\[missing \"([\w\.]+)\" translation\]/);
    return match ? match[1] : undefined;
}


(function () {

    // Add div#sandbox to body
    require([
        'jquery'
    ], function ($) {
        $('body').append('<div id="sandbox" style="overflow: hidden; height: 1px;"></div>');
    });

    // Load app initial requirements
    require([
        // Load requirements from require_main.js
        'app',
        'underscore',
        'bootstrap',
        'behaviour',
        'tools',
        'backbone_basicauth',
        'backbone_patch_as_put',

        // Load locales
        'locales/en',
        'locales/de',

        // Load requirements from app.js
        'app/user_sessions/user_sessions_app',
        'app/efforts/efforts_app',
        'app/projects/projects_app',
        'app/tasks/tasks_app',
        'app/users/users_app',
        'app/common/loading_view',
        'app/common/home_view'
    ]);
}());
