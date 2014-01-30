/** @module model_helper */

define(function() {
    return {
        /**
         * Extracts names of attributes, which should be disabled.
         *
         * Checks for keys containing 'IsDefault'. If the according value is false, then the attribute will be
         * appended to returning result.
         *
         * @example
         * // server response
         * {
         *   id: 23,
         *   name: 'Foo Bar',
         *   status: 7,
         *   nameIsDefault: true
         *   statusIsDefault: false
         * }
         * // returns ['status']
         *
         * @param attrs {object} - Model attributes given by models parse function.
         * @returns {string[]} - Array of attributes names, which were set to be disabled.
         */
        disabled_fields: function(attrs) {
            var token = 'IsDefault';

            return _.compact(_.map(attrs, function(value, key) {
                // key includes token and value is false
                return key.indexOf(token) != -1 && !value ? key.replace(token, '') : false;
            }));
        }
    }
});