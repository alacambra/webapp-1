/** @module model_helper */

define({
    validates_presence_of: function(attributes, attrs, errors) {
        if (typeof attributes === 'string') attributes = [attributes];

        _.each(attributes, function(attr) {
            if (errors[attr] !== undefined) return; // skip if an error was set already

            if (typeof attrs[attr] !== 'string') {
                errors[attr] = I18n.t('errors.validation.invalid');
            } else if (is_blank(attrs[attr])) {
                errors[attr] = I18n.t('errors.validation.empty');
            }
        });

        return errors;
    },


    validates_length_of: function(attr, min_length, max_length, attrs, errors) {
        if (errors[attr] !== undefined) return errors;

        if (min_length === max_length && attrs[attr].length !== min_length) {
            errors[attr] = I18n.t('errors.validation.wrong_length', { count: min_length });
        } else {
            if (attrs[attr].length < min_length) {
                errors[attr] = I18n.t('errors.validation.too_short', { count: min_length });
            } else if (attrs[attr].length > max_length) {
                errors[attr] = I18n.t('errors.validation.too_long', { count: max_length });
            }
        }

        return errors;
    },


    validates_format_of: function(attr, format, attrs, errors, options) {
        if (errors[attr] !== undefined) return errors;

        var default_options = {
            allow_blank: false
        };

        options = _.extend(default_options, options || {});

        if (options.allow_blank && is_blank(attrs[attr])) return errors;

        if (!format.test(attrs[attr])) {
            errors[attr] = I18n.t('errors.validation.invalid');
        }

        return errors;
    },


    validates_confirmation_of: function(attr, attrs, errors) {
        if (errors[attr] !== undefined) return errors;

        var attr_confirmation = attr + 'Confirmation';

        if (attrs[attr] !== attrs[attr_confirmation]) {
            errors[attr] = I18n.t('errors.validation.confirmation');
        }

        return errors;
    },


    validates_exclusion_of: function(attr, val, attrs, errors, options) {
        if (errors[attr] !== undefined) return errors;

        var default_options = {
            allow_blank: false
        };

        options = _.extend(default_options, options || {});

        if (options.allow_blank && is_blank(attrs[attr])) return errors;

        if (attrs[attr] == val) {
            errors[attr] = I18n.t('errors.validation.invalid');
        }

        return errors;
    },


    validates_inclusion_of: function(attr, min, max, attrs, errors, options) {
        if (errors[attr] !== undefined) return errors;

        var default_options = {
            allow_blank: false,
            message: I18n.t('errors.validation.invalid')
        };

        options = _.extend(default_options, options || {});

        if (options.allow_blank && is_blank(attrs[attr])) return errors;

        if (attrs[attr] < min || attrs[attr] > max) {
            errors[attr] = options.message;
        }

        return errors;
    }
});