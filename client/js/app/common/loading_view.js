define(['app',
        'tpl!app/common/templates/loading.tpl'],
function (App, loading_tpl) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.LoadingView = Marionette.ItemView.extend({
            template: loading_tpl,

            onRender: function () {
                var that = this;
                setTimeout(function() {
                    var $load_indicator = that.$('#js-load-indicator');
                    if ($load_indicator) $load_indicator.fadeIn(1000);
                }, 1000);
            }
        });
    });

    return App.Common.LoadingView;
});