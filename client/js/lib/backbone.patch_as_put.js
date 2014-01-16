define(function() {
    // Store a copy of the original Backbone.sync
    var originalSync = Backbone.sync;

    Backbone.sync = function(method, model, options) {
        if (method === 'patch') options.type = 'PUT';

        // Perform the sync
        return originalSync.call(model, method, model, options);
    };
});

