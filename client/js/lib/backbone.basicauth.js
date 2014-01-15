define(['app', 'lib/storage'], function(App, Storage) {
    var storage = new Storage;


    App.generate_credentials = function(username, password) {
        return btoa(unescape(encodeURIComponent([username, password].join(':'))))
    };


    App.set_credentials = function(credentials) {
        storage.set('credentials', credentials);
        App.triggerMethod('main_navi:log' + (App.logged_in() ? 'in' : 'out'));
    };


    App.get_credentials = function() {
        return storage.get('credentials');
    };


    App.logged_in = function() {
        return !is_empty(App.get_credentials());
    };


    // Store a copy of the original Backbone.sync
    var originalSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
        options = options || {};

        if (App.logged_in()) {
            options.headers = options.headers || {};
            _.extend(options.headers, { 'Authorization': 'Basic ' + App.get_credentials() });
        }

        // Perform the sync
        return originalSync.call(model, method, model, options);
    };
});

