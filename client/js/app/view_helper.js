/** @module view_helper */

define(['app', 'i18n'], function(App) {
    return {
        link_to: function(text, target, options) {
            options = _.extend({ i18n: true }, options);
            if (options.i18n) text = is_blank(text) ? '' : I18n.t(text);

            var anchor = $('<a>', {
                text: text,
                href: target.href,
                'data-navigate': target.event,
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

        path: function(entity, action, id1, id2) {
            if (_.isUndefined(action)) return App.path[entity]();
            return App.path[entity][action](id1, id2);
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