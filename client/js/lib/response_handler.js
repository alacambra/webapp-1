define(['app', 'app/common/not_found_view'], function(App, NotFoundView) {
    return {
        handle: function (response, actions, default_callback) {
            actions = actions || {};
            if (default_callback === undefined) default_callback = function() { console.log('uncatched response code'); };

            console.log(response);

            var defined_action = actions[response.status];

            if (defined_action) {
                defined_action();
            } else {
                switch (response.status) {
                    case 401:
                        App.redirect_location = App.current_route();
                        App.trigger('user_session:login');
                        break;
                    case 404:
                        App.main_region.show(new NotFoundView());
                        break;
                    case 503:
                        console.log('service unavailable');
                        break;
                    default: default_callback();
                }
            }
        }
    };
});