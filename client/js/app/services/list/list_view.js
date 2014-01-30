define(['app',
        'tpl!app/services/list/templates/list.tpl',
        'tpl!app/services/list/templates/list_item.tpl',
        'app/common/empty_view',
        'app/app_helper',
        'app/view_helper',
        'app/services/services_helper'],
function(App, list_tpl, list_item_tpl, EmptyView, app_helper, view_helper, services_helper) {
    App.module('Services.List', function(List, App, Backbone, Marionette, $, _) {
        List.ItemView = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, services_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-service': 'delete_item'
            },

            
            delete_item: function(event) {
                event.preventDefault();
                App.trigger('service:delete', this.model);
            }
        });


        List.View = Marionette.CompositeView.extend({
            id: 'services',
            template: list_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),
            itemView: List.ItemView,
            itemViewContainer: '#js-service-list-items',
            emptyView: EmptyView,

            events: {
                'click a[data-navigate]': App.handle_link
            }
        })
    });

    return App.Services.List;
});
