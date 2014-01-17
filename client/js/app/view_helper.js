/** @module view_helper */

define(['i18n'], function() {
    return {
        link_to: function(text, target, options) {
            options = _.extend({ i18n: true }, target, options);
            if (options.i18n) text = is_blank(text) ? '' : I18n.t(text);

            var anchor = $('<a>', {
                text: text,
                href: options.href,
                'data-navigate': options.event,
                id: options.id,
                class: options.class
            });

            if (!_.isUndefined(options.icon)) {
                anchor.prepend($('<span>', { class: 'glyphicon glyphicon-' + options.icon }));
            }

            return anchor[0].outerHTML;
        },

        button_to: function(text, target, options) {
            var button_css = 'btn btn-default btn-sm';

            if (!is_blank(text)) button_css += ' btn-text';

            if (_.isUndefined(options.class)) {
                options.class = button_css;
            } else {
                options.class = button_css + ' ' + options.class;
            }

            return this.link_to(text, target, options);
        },


        home_path: function() {
            return { href: '/', event: 'home' };
        },


        tasks_path: function() {
            return { href: '#tasks', event: 'tasks:list' };
        },

        new_task_path: function() {
            return { href: '#tasks/new', event: 'task:new' };
        },

        task_path: function(task_id) {
            return { href: '#tasks/' + task_id, event: 'task:show,' + task_id };
        },

        edit_task_path: function(task_id) {
            return { href: '#tasks/' + task_id + '/edit', event: 'task:edit,' + task_id };
        },


        efforts_path: function(task_id) {
            return { href: '#tasks/' + task_id + '/efforts', event: 'efforts:list,' + task_id };
        },

        new_effort_path: function(task_id) {
            return { href: '#tasks/' + task_id + '/efforts/new', event: 'effort:new,' + task_id };
        },


        is_new_action: function() {
            return Backbone.history.location.hash.indexOf('new') != -1;
        },


        format_date: function(date) {
            return moment(date * 1000).format(I18n.t('date_format'));
        },

        unformat_date: function(date) {
            return moment(date, I18n.t('date_format')).unix();
        },

        format_time: function(time) {
            time = moment.duration(time, 'minutes');
            return parseInt(time.asHours()) + ':' + pad(time.asMinutes() % 60);
        },

        unformat_time: function(time) {
            return moment.duration(time, 'HH:mm').asMinutes();
        }
    }
});