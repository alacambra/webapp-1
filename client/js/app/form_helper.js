/** @module form_helper */

define({
    mark_errors: function(view, errors) {
        var $view = view.$el;

        var mark_errors = function(value, key) {
            var $control_group = $view.find(view.cssPrefix + key).parent().parent();
            var $error_msg = $('<span>', { class: 'help-block', text: value });
            $control_group.append($error_msg).addClass('has-error');
        };

        _.each(errors, mark_errors);
    },


    clear_errors: function(view) {
        var $form = view.$el.find('form');

        $form.find('.help-block').remove();
        $form.find('.form-group.has-error').removeClass('has-error');

        view.ui.submit_button.removeClass('btn-danger');
        view.ui.submit_error_msg.hide();
    },


    show_load_indicator: function(view) {
        view.ui.save_indicator.fadeIn(300);
        view.ui.submit_button.addClass('disabled');
    },


    show_save_error: function(view) {
        view.ui.save_indicator.fadeOut(300, function() {
            view.ui.submit_button.removeClass('disabled').addClass('btn-danger');
            view.ui.submit_error_msg.text(I18n.t('errors.save_failed')).show();
        });
    }
});