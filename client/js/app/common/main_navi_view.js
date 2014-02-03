define(['app',
        'tpl!app/common/templates/main_navi.tpl',
        'app/common/message_view',
        'app/app_helper',
        'app/view_helper'],
function (App, main_navi_tpl, MessageView, app_helper, view_helper) {
    App.module('Common', function (Common, App, Backbone, Marionette, $, _) {
        Common.MainNaviView = Marionette.ItemView.extend({
            template: main_navi_tpl,
            templateHelpers: _.extend(app_helper, view_helper),


            initialize: function(options) {
                this.available_locales = options.available_locales;

                var that = this;
                App.on('main_navi:highlight:item', function(item) {
                    that.highlight_navi($('#js-main-navi-items').find('a[href="#' + item + '"]').parent());
                });

                App.on('main_navi:login', function() {
                    that.render();
                });

                App.on('main_navi:logout', function() {
                    that.render();
                });
            },


            serializeData: function() {
                return {
                    available_locales: this.available_locales,
                    logged_in: App.logged_in(),
                    current_user: App.get_current_user()
                }
            },


            ui: {
                login_button: '#login_button',
                logout_button: '#logout_button'
            },


            events: {
                'click a[data-navigate]': App.handle_link,
                'click a[href="#"]': 'empty_item_clicked',
                'click #js-locale a': 'switch_locale'
            },


            empty_item_clicked: function(event) {
                event.preventDefault();

                App.main_region.show(new MessageView);
                App.navigate();
                this.highlight_navi($(event.target).parent());
            },


            switch_locale: function(event) {
                event.preventDefault();
                var locale = $(event.target).attr('href').replace('#', '');
                localStorage.setItem('locale', locale);
                document.location.reload(); // TODO: rerender current view instead of reloading
            },


            highlight_navi: function($elem) {
                $('#js-main-navi-items').find('li').removeClass('active');
                $elem.addClass('active');
            }
        });
    });

    return App.Common.MainNaviView;
});