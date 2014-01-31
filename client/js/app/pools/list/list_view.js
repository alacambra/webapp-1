define(['app',
        'tpl!app/pools/list/templates/list.tpl',
        'tpl!app/pools/list/templates/list_item.tpl',
        'app/common/empty_view',
        'app/app_helper',
        'app/view_helper',
        'app/pools/pools_helper'],
function(App, list_tpl, list_item_tpl, EmptyView, app_helper, view_helper, pools_helper) {
    App.module('Pools.List', function(List, App, Backbone, Marionette, $, _) {
        List.ItemView = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, pools_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete-pool': 'delete_item'
            },

            
            delete_item: function(event) {
                event.preventDefault();
                App.trigger('pool:delete', this.model);
            }
        });


        List.View = Marionette.CompositeView.extend({
            id: 'pools',
            template: list_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),
            itemView: List.ItemView,
            itemViewContainer: '#js-pool-list-items',
            emptyView: EmptyView,

            events: {
                'click a[data-navigate]': App.handle_link
            }
        })
    });

    return App.Pools.List;
});
