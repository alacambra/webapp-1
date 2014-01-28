/** @module model_helper */

define(function() {
    return {
        disabled_fields: function(attrs) {
            var token = 'IsDefault';

            return _.compact(_.map(attrs, function(value, key) {
                // key includes token and value is false
                return key.indexOf(token) != -1 && !value ? key.replace(token, '') : false;
            }));
        }
    }
});