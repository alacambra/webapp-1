define(['app', 'app/common/message_view'], function(App, MessageView) {
    return {
        handle: function (response, actions, default_callback) {
            actions = actions || {};
            default_callback = default_callback || function() { console.log('uncatched response code'); };

            //console.log(response);

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
                        App.main_region.show(new MessageView({ message: 'errors.page_not_found', type: 'danger' }));
                        break;
                    case 503:
                        App.main_region.show(new MessageView({ message: 'errors.server_unreachable', type: 'warning' }));
                        break;
                    default: default_callback();
                }
            }
        }
    };
});