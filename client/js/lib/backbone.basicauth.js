define(['app'], function(App) {
    App.set_credentials = function(username, password) {
        if (!username) {
            App.credentials = undefined;
        } else {
            App.credentials = btoa(unescape(encodeURIComponent([username, password].join(':'))));
        }

        App.triggerMethod('main_navi:log' + (App.logged_in() ? 'in' : 'out'));
    };


    App.logged_in = function() {
        return App.credentials !== undefined;
    };


    // Store a copy of the original Backbone.sync
    var originalSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
        options = options || {};

        if (App.logged_in()) {
            options.headers = options.headers || {};
            _.extend(options.headers, { 'Authorization': 'Basic ' + App.credentials });
        }

        // Perform the sync
        return originalSync.call(model, method, model, options);
    };
});

