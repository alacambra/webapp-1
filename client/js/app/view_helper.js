/** @module view_helper */

define(['app',
        'i18n',
        'moment'],
function(App, i18n, moment) {
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


        /**
         * Format specified date into current locale date format.
         *
         * @param date - value of date in seconds
         * @returns {string} - formatted date depending on current locale
         */
        format_date: function(date) {
            return moment(date * 1000).format(I18n.t('date_format'));
        },

        /**
         * Unformat date from current locale date format into date value in seconds.
         *
         * @param date - formatted date
         * @returns {number} - date value in seconds
         */
        unformat_date: function(date) {
            return moment(date, I18n.t('date_format')).unix();
        },

        /**
         * Format specified time into the format HH:mm.
         *
         * @param time - time in minutes
         * @returns {string} - formatted time
         */
        format_time: function(time) {
            time = moment.duration(time, 'minutes');
            return parseInt(time.asHours()) + ':' + pad(time.asMinutes() % 60);
        },

        /**
         * Unformat time into minutes.
         *
         * @param time - formatted time
         * @returns {number} - time in minutes
         */
        unformat_time: function(time) {
            return moment.duration(time, 'HH:mm').asMinutes();
        }
    }
});