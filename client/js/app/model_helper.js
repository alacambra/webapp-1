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
         * Extends the Backbone save function, to remove attributes, which should not be sent to server.
         *
         * @param model {object} - Backbone model, whose save function should be set.
         * @param attributes {object} - Attributes given by Backbone model save function as first paremeter.
         * @param options {object} - Options given by Backbone model save function as first paremeter.
         * @param [exclude_options] {object} - Options to override default getter for exclusion array.
         * @param [exclude_options.excluded_fields=model.excluded_fields] {string[]} - List of attribute names which are excluded.
         * @param [exclude_options.disabled_fields=model.disabled_fields] {string[]} - List of attribute names which are disabled.
         * @returns {*}
         */
        save_without_excluded_attributes: function(model, attributes, options, exclude_options) {
            attributes = attributes || {};

            var default_exclude_options = {
                excluded_fields: model.excluded_fields,
                disabled_fields: model.disabled_fields
            };

            exclude_options = _.extend(default_exclude_options, exclude_options || {});

            // filter data that is excluded or disabled from server request
            _.each(_.union(exclude_options.excluded_fields, exclude_options.disabled_fields), function (name) {
                delete attributes[name];
            });

            var default_options = {
                contentType: 'application/json',
                data: JSON.stringify(attributes)
            };

            options = _.extend(default_options, options || {});

            // proxy the call to the original save function
            return Backbone.Model.prototype.save.call(model, attributes, options);
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