define(['app',
        'tpl!app/common/templates/main_navi.tpl'],
function (App, main_navi_tpl) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.MainNaviView = Marionette.ItemView.extend({
            template: main_navi_tpl,


            initialize: function(options) {
                this.available_locales = options.available_locales;
            },


            serializeData: function() {
                return {
                    available_locales: this.available_locales
                }
            },


            events: {
                'click #js-locale a': 'switch_locale'
            },


            switch_locale: function(event) {
                event.preventDefault(); event.stopPropagation();
                var locale = $(event.target).attr('href').replace('#', '');
                localStorage.setItem('locale', locale);
                document.location.reload(); // TODO: rerender current view instead of reloading
            }
        });
    });

    return App.Common.MainNaviView;
});