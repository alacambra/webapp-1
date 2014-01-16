define(['app',
        'tpl!app/common/templates/home.tpl'],
function (App, home_tpl) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.HomeView = Marionette.ItemView.extend({
            template: home_tpl
        });
    });

    return App.Common.HomeView;
});