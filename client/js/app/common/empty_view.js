define(['app',
        'tpl!app/common/templates/message.tpl',
        'app/common/message_view'],
function (App, message_tpl, MessageView) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.EmptyView = MessageView.extend({
            template: message_tpl,

            serializeData: function() {
                return {
                    message: I18n.t('common.empty_list'),
                    type: 'info'
                }
            }
        });
    });

    return App.Common.EmptyView;
});