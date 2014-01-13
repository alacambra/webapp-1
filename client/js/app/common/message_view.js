define(['app',
        'tpl!app/common/templates/message.tpl'],
function (App, message_tpl) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.LoadingView = Marionette.ItemView.extend({
            template: message_tpl,

            initialize: function(options) {
                this.options = _.extend({
                    message: 'errors.page_not_found',
                    type: 'info'
                }, options);
            },

            serializeData: function() {
                return {
                    message: I18n.t(this.options.message),
                    type: this.options.type
                }
            }
        });
    });

    return App.Common.LoadingView;
});