app(['app',
     'tpl!app/common/templates/not_found.tpl'],
function (App, not_found_tpl) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.NotFoundView = Marionette.ItemView.extend({
            template: not_found_tpl
        });
    });
});