define(['app',
        'tpl!app/pools/edit/templates/edit.tpl',
        'app/app_helper',
        'app/view_helper',
        'app/form_helper',
        'app/pools/pools_helper',
        'backbone_syphon',
        'jquery_elastic'],
function(App, edit_tpl, app_helper, view_helper, form_helper, pools_helper) {
    App.module('Pools.Edit', function(Edit, App, Backbone, Marionette, $, _) {
        Edit.View = Marionette.ItemView.extend({
            className: 'edit',
            template: edit_tpl,
            templateHelpers: _.extend({}, app_helper, view_helper, pools_helper),

            cssPrefix: '#js-pool-',

            
            ui: {
                name: '#js-pool-name',
                description: '#js-pool-description',

                submit_button: '#js-pool-submit',
                submit_error_msg: '#js-pool-submit-error-msg',
                save_indicator: '#js-pool-save-indicator'
            },

            
            events: {
                'click a[data-navigate]': App.handle_link,
                'click button.js-submit': 'submit'
            },


            onRender: function () {
                this.init_description_elastic_textarea();

                form_helper.extend_fields({
                    mandatory: {},
                    maxlength: {}
                }, this);
            },


            /*
             * onRender helpers
             */

            init_description_elastic_textarea: function() {
                this.ui.description.focus(function() {
                    var $this = $(this);
                    if (!$this.data('elastic-enabled')) {
                        $this.elastic().data('elastic-enabled', true);
                        $this.unbind('blur'); // this removes the issue when clicking a button doesn't work while textarea is focused
                    }
                });
            },


            /*
             * view event handlers
             */

            submit: function(e) {
                e.preventDefault();

                form_helper.clear_errors(this);

                var data = Backbone.Syphon.serialize(this);
                this.trigger('form:submit', pools_helper.unformat(data));
            },


            go_to_home: function (event) {
                event.preventDefault();
                App.trigger('home');
            },

            go_to_pools: function (event) {
                event.preventDefault();
                App.trigger('pools:list');
            },

            go_to_pool: function (event) {
                event.preventDefault();
                App.trigger('pool:show', this.model.get('id'));
            },


            /*
             * controller event handlers
             */

            onFormDataValid: function() {
                form_helper.show_load_indicator(this);
            },


            onFormDataInvalid: function(errors) {
                form_helper.mark_errors(this, errors);
            },


            onFormSaveFailed: function() {
                form_helper.show_save_error(this);
            }
        });
    });

    return App.Pools.Edit;
});
