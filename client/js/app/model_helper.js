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
        },

        /**
         * Server can not store null values for attributes and is not able to easily convert them to be null values in the
         * response - so this functions takes care of this problem and must be called in every model parse function.
         *
         * @param response - server response with server_null_value
         * @returns {*} - response with converted null values
         */
        convert_server_response: function (response) {
            var server_null_value = 99999999999999;
            _.each(response, function (val, key) {
                if (val === server_null_value || val === -server_null_value) response[key] = null;
            });
            return response;
        }
    }
});