/** @module validation_helper */

define(['i18n'],
function() {
    return {
        /**
         * Validates attribute and its confirmation input to be identical.
         *
         * The confirmation attribute is expected to be named with a apprended "Confirmation", i.e. password and passwordConfirmation.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @returns {object} - Extended version of given errors object.
         */
        validates_confirmation_of: function(attr, attrs, errors) {
            if (errors[attr] !== undefined) return errors;

            var attr_confirmation = attr + 'Confirmation';

            if (attrs[attr] !== attrs[attr_confirmation]) {
                errors[attr] = I18n.t('errors.validation.confirmation');
            }

            return errors;
        },


        /**
         * Validates attribute(s) not to be a specific value.
         *
         * @param attributes {string|string[]} - Name of the attribute(s) to be checked.
         * @param val {string} - Value which should not be accepted as valid.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message='errors.validation.invalid'] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_exclusion_of: function(attributes, val, attrs, errors, options) {
            if (typeof attributes === 'string') attributes = [attributes];

            _.each(attributes, function(attr) {
                if (errors[attr] !== undefined) return errors;

                var default_options = {
                    allow_blank: false,
                    message: I18n.t('errors.validation.invalid')
                };

                options = _.extend(default_options, options || {});

                if (options.allow_blank && is_blank(attrs[attr])) return errors;

                if (attrs[attr] == val) {
                    errors[attr] = options.message;
                }
            });

            return errors;
        },


        /**
         * Validates length of text for given attribute.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param format {regex} - Regular expression attribute should match.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @returns {object} - Extended version of given errors object.
         */
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


        /**
         * Validates attribute to be in a specific range.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param min {number} - Minimum value which should be accepted as valid.
         * @param max {number} - Maximum value which should be accepted as valid.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message'errors.validation.invalid'] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
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
        },


        /**
         * Validates length of text for given attribute.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param min_length {number} - Minimum length of text to be valid.
         * @param max_length {number} - Maximum length of text to be valid.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @returns {object} - Extended version of given errors object.
         */
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


        /**
         * Validates attribute(s) to be numeric.
         *
         * @param attributes {string|string[]} - Name of the attribute(s) to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.only_integer=false] {boolean} - Only integers will be accepted as valid.
         * @param [options.message] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_numericality_of: function(attributes, attrs, errors, options) {
            errors || (errors = {});

            if (_.isString(attributes)) attributes = [attributes];

            _.each(attributes, function(attr) {
                if (errors[attr] !== undefined) return errors;

                var default_options = {
                    allow_blank: false,
                    only_integer: false,
                    message: I18n.t('errors.validation.no_number')
                };

                options = _.extend(default_options, options || {});

                if (options.allow_blank && is_blank(attrs[attr])) return errors;

                if (!_.isNumber(attrs[attr]) || _.isNaN(attrs[attr]) || (options.only_integer && attrs[attr] % 1 !== 0)) {
                    errors[attr] = options.message;
                }
            });

            return errors;
        },


        /**
         * Validates presence of text for given attribute(s).
         *
         * Sets error message "invalid", if attribute is no string.
         * Sets error message "empty", if attribute is empty.
         *
         * @param attributes {string|string[]} - Name of the attribute(s) to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @returns {object} - Extended version of given errors object.
         */
        validates_presence_of: function(attributes, attrs, errors) {
            if (typeof attributes === 'string') attributes = [attributes];

            _.each(attributes, function(attr) {
                if (errors[attr] !== undefined) return; // skip if an error was set already

                if (is_blank(attrs[attr])) {
                    errors[attr] = I18n.t('errors.validation.empty');
                }
            });

            return errors;
        }
    }
});