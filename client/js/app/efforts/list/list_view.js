define(['app',
        'tpl!app/efforts/list/templates/list.tpl',
        'tpl!app/efforts/list/templates/list_item.tpl',
        'app/common/empty_view',
        'app/app_helper',
        'app/view_helper',
        'app/efforts/efforts_helper'],
function(App, list_tpl, list_item_tpl, EmptyView, app_helper, view_helper, efforts_helper) {
    App.module('Efforts.List', function(List, App, Backbone, Marionette, $, _) {
        List.ItemView = Marionette.ItemView.extend({
            className: 'list-row',
            template: list_item_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, efforts_helper),


            events: {
                'click a[data-navigate]': App.handle_link,
                'click .js-delete': 'delete_item'
            },


            serializeData: function() {
                return _.extend({}, this.model.attributes, {
                    task_id: this.model.task_id
                });
            },


            delete_item: function(event) {
                event.preventDefault();
                App.trigger('effort:delete', this.model.task_id, this.model);
            }
        });


        List.View = Marionette.CompositeView.extend({
            id: 'efforts',
            template: list_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper),
            itemView: List.ItemView,
            itemViewContainer: '#js-effort-list-items',
            emptyView: EmptyView,

            events: {
                'click a[data-navigate]': App.handle_link
            },

            serializeData: function() {
                return {
                    task_id: this.collection.task_id
                }
            }            
        });
    });

    return App.Efforts.List;
});
