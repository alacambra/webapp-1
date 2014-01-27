/** @module validation_helper */

define(['i18n'],
function() {
    return {
        /**
         * Validates attribute(s) and their confirmation input to be identical.
         *
         * The confirmation attribute is expected to be named with a appended "Confirmation", i.e. password and passwordConfirmation.
         *
         * @param attributes {string|string[]} - Name of the attribute(s) to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param [errors={}] {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.message=I18n.t('errors.validation.confirmation')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_confirmation_of: function(attributes, attrs, errors, options) {
            errors = errors || {};

            if (_.isString(attributes)) attributes = [attributes];

            var default_options = {
                if: true,
                message: I18n.t('errors.validation.confirmation')
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return errors;

            _.each(attributes, function(attr) {
                if (!_.isUndefined(errors[attr])) return; // attribute already has error, do not overwrite/stack

                var attr_confirmation = attr + 'Confirmation';

                if (attrs[attr] !== attrs[attr_confirmation]) {
                    errors[attr] = options.message;
                }
            });

            return errors;
        },


        /**
         * Validates attribute(s) not to be in a specific range.
         *
         * @param attributes {string|string[]} - Name of the attribute(s) to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param [errors={}] {object} - Object containing already existing error messages.
         * @param options {object} - Options to override default options.
         * @param options.in - Values which should be not accepted as valid (specified as blacklist array or range (object specifing min+max).
         * @param [options.in.min] - Minimum value which should be not accepted as valid.
         * @param [options.in.max] - Maximum value which should be not accepted as valid.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message=I18n.t('errors.validation.confirmation')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_exclusion_of: function(attributes, attrs, errors, options) {
            errors = errors || {};

            if (_.isString(attributes)) attributes = [attributes];

            var default_options = {
                if: true,
                allow_blank: false,
                message: I18n.t('errors.validation.invalid')
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return errors;

            if (_.isUndefined(options.in)) throw Error('options.in must be defined');
            if (!_.isArray(options.in) && (_.isUndefined(options.in.min) || _.isUndefined(options.in.max))) {
                throw Error('options.in must define min and max');
            }

            _.each(attributes, function(attr) {
                if (!_.isUndefined(errors[attr])) return; // attribute already has error, do not overwrite/stack

                if (options.allow_blank && is_blank(attrs[attr])) return;

                if (_.isArray(options.in)) {
                    if (_.contains(options.in, attrs[attr]) || is_blank(attrs[attr])) {
                        errors[attr] = options.message;
                    }
                } else {
                    if (attrs[attr] >= options.in.min && attrs[attr] <= options.in.max) {
                        errors[attr] = options.message;
                    }
                }
            });

            return errors;
        },


        /**
         * Validates format of attribute(s) to match regular expression.
         *
         * @param attributes {string|string[]} - Name of the attribute(s) to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param [errors={}] {object} - Object containing already existing error messages.
         * @param options {object} - Options to override default options.
         * @param options.with {regex} - Format which should be accepted as valid.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message='errors.validation.invalid'] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_format_of: function(attributes, attrs, errors, options) {
            errors = errors || {};

            if (_.isString(attributes)) attributes = [attributes];

            var default_options = {
                if: true,
                allow_blank: false,
                message: I18n.t('errors.validation.invalid')
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return errors;

            if (_.isUndefined(options.with)) throw Error('options.with must be defined');

            _.each(attributes, function(attr) {
                if (!_.isUndefined(errors[attr])) return; // attribute already has error, do not overwrite/stack

                if (options.allow_blank && is_blank(attrs[attr])) return;

                if (!options.with.test(attrs[attr]) || is_blank(attrs[attr])) {
                    errors[attr] = options.message;
                }
            });

            return errors;
        },


        /**
         * Validates attribute(s) to be in a specific range.
         *
         * @param attributes {string|string[]} - Name of the attribute(s) to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param [errors={}] {object} - Object containing already existing error messages.
         * @param options {object} - Options to override default options.
         * @param options.in - Values which should be accepted as valid (specified as whitelist array or range (object specifing min+max).
         * @param [options.in.min] - Minimum value which should be accepted as valid.
         * @param [options.in.max] - Maximum value which should be accepted as valid.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message=I18n.t('errors.validation.confirmation')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_inclusion_of: function(attributes, attrs, errors, options) {
            errors = errors || {};

            if (_.isString(attributes)) attributes = [attributes];

            var default_options = {
                if: true,
                allow_blank: false,
                message: I18n.t('errors.validation.invalid')
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return errors;

            if (_.isUndefined(options.in)) throw Error('options.in must be defined');
            if (!_.isArray(options.in) && (_.isUndefined(options.in.min) || _.isUndefined(options.in.max))) {
                throw Error('options.in must define min and max');
            }

            _.each(attributes, function(attr) {
                if (!_.isUndefined(errors[attr])) return; // attribute already has error, do not overwrite/stack

                if (options.allow_blank && is_blank(attrs[attr])) return;

                if (_.isArray(options.in)) {
                    if (!_.contains(options.in, attrs[attr]) || is_blank(attrs[attr])) {
                        errors[attr] = options.message;
                    }
                } else {
                    if (attrs[attr] < options.in.min || attrs[attr] > options.in.max) {
                        errors[attr] = options.message;
                    }
                }
            });

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
         * @param [errors={}] {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.only_integer=false] {boolean} - Only integers will be accepted as valid.
         * @param [options.message=I18n.t('errors.validation.no_number')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_numericality_of: function(attributes, attrs, errors, options) {
            errors = errors || {};

            if (_.isString(attributes)) attributes = [attributes];

            var default_options = {
                if: true,
                allow_blank: false,
                only_integer: false,
                message: I18n.t('errors.validation.no_number')
            };

            options = _.extend(default_options, options || {});

            if (!options.if) return errors;

            _.each(attributes, function(attr) {
                if (!_.isUndefined(errors[attr])) return; // attribute already has error, do not overwrite/stack

                if (options.allow_blank && is_blank(attrs[attr])) return;

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