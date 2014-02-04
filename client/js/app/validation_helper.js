/** @module validation_helper */

define(['i18n', 'advanced_string'],
function() {
    return {
        validate: function(validations, attrs, errors) {
            errors = errors || {};

            var that = this;

            _.each(validations, function(params, attribute) {
                // single validation without options given i.e. name: 'presence'
                if (_.isString(params)) params = [params];

                // only validation with options given i.e. name: ['presence', { if: x }]
                if (params.length == 2 && _.isString(params[0]) && !_.isArray(params[1])) params = [params];

                _.each(params, function(param) {
                    var type, options;

                    if (_.isArray(param)) {
                        type = param[0];
                        options = param[1];
                    } else {
                        type = param;
                    }

                    if (_.isFunction(that['validates_' + type + '_of'])) {
                        that['validates_' + type + '_of'](attribute, attrs, errors, options);
                    } else {
                        throw Error('validation does not exist');
                    }

                });
            });

            return _.isEmpty(errors) ? false : errors;
        },


        /**
         * Validates attribute and their confirmation input to be identical.
         *
         * The confirmation attribute is expected to be named with a appended "Confirmation", i.e. password and passwordConfirmation.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.message=I18n.t('errors.validation.confirmation')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_confirmation_of: function(attr, attrs, errors, options) {
            var default_options = {
                if: true,
                message: I18n.t('errors.validation.confirmation')
            };

            options = _.extend(default_options, options || {});

            // validation disabled || attribute already has error (do not overwrite/stack)
            if (!options.if || !_.isUndefined(errors[attr])) return errors;

            var attr_confirmation = attr + 'Confirmation';

            if (attrs[attr] !== attrs[attr_confirmation]) {
                errors[attr] = options.message;
            }

            return errors;
        },


        validates_exclusion_of: function(attr, attrs, errors, options) {
            var default_options = {
                if: true,
                allow_blank: false,
                message: I18n.t('errors.validation.invalid')
            };

            options = _.extend(default_options, options || {});

            // validation disabled || attribute already has error (do not overwrite/stack)
            if (!options.if || !_.isUndefined(errors[attr])) return errors;

            if (_.isUndefined(options.in)) throw Error('options.in must be defined');
            if (!_.isArray(options.in) && _.isUndefined(options.in.min) && _.isUndefined(options.in.max)) {
                throw Error('options.in must be array or object defining min or max');
            }

            if (options.allow_blank && is_blank(attrs[attr])) return errors;

            if (_.isArray(options.in)) {
                if (_.contains(options.in, attrs[attr])) {
                    errors[attr] = options.message;
                }
            } else {
                if ((_.isUndefined(options.in.min) || attrs[attr] >= options.in.min) &&
                    (_.isUndefined(options.in.max) || attrs[attr] <= options.in.max)) {
                    errors[attr] = options.message;
                }
            }

            return errors;
        },


        /**
         * Validates format of attribute to match regular expression.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param options {object} - Options to override default options.
         * @param options.with {regex} - Format which should be accepted as valid.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.trim=false] {boolean} - Remove leading and trailing whitespace before checking.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message='errors.validation.invalid'] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_format_of: function(attr, attrs, errors, options) {
            var default_options = {
                if: true,
                trim: false,
                allow_blank: false,
                message: I18n.t('errors.validation.invalid')
            };

            options = _.extend(default_options, options || {});

            // validation disabled || attribute already has error (do not overwrite/stack)
            if (!options.if || !_.isUndefined(errors[attr])) return errors;

            if (_.isUndefined(options.with)) throw Error('options.with must be defined');

            var attribute = options.trim && _.isString(attrs[attr]) ? attrs[attr].trim() : attrs[attr];

            if (options.allow_blank && is_blank(attribute)) return errors;

            if (!options.with.test(attribute) || is_blank(attribute)) {
                errors[attr] = options.message;
            }

            return errors;
        },


        /**
         * Validates attribute to be in a specific range.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param options {object} - Options to override default options.
         * @param options.in - Values which should be accepted as valid (specified as whitelist array or range (object specifing min/max).
         * @param [options.in.min] - Minimum value which should be accepted as valid.
         * @param [options.in.max] - Maximum value which should be accepted as valid.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message=I18n.t('errors.validation.confirmation')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_inclusion_of: function(attr, attrs, errors, options) {
            var default_options = {
                if: true,
                allow_blank: false,
                message: I18n.t('errors.validation.invalid')
            };

            options = _.extend(default_options, options || {});

            // validation disabled || attribute already has error (do not overwrite/stack)
            if (!options.if || !_.isUndefined(errors[attr])) return errors;

            if (_.isUndefined(options.in)) throw Error('options.in must be defined');
            if (!_.isArray(options.in) && _.isUndefined(options.in.min) && _.isUndefined(options.in.max)) {
                throw Error('options.in must be array or object defining min or max');
            }

            if (options.allow_blank && is_blank(attrs[attr])) return errors;

            if (_.isArray(options.in)) {
                if (!_.contains(options.in, attrs[attr])) {
                    errors[attr] = options.message;
                }
            } else {
                if (!_.isUndefined(options.in.min) && attrs[attr] < options.in.min) {
                    errors[attr] = options.message;
                }
                if (!_.isUndefined(options.in.max) && attrs[attr] > options.in.max) {
                    errors[attr] = options.message;
                }
            }

            return errors;
        },


        /**
         * Validates length of text for given attribute.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param options {object} - Options to override default options.
         * @param [options.min] - Minimum length which should be accepted as valid (optional if max is set).
         * @param [options.max] - Maximum length which should be accepted as valid (optional if min is set).
         * @param [options.trim=false] {boolean} - Remove leading and trailing whitespace before checking.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @returns {object} - Extended version of given errors object.
         */
        validates_length_of: function(attr, attrs, errors, options) {
            var default_options = {
                if: true,
                trim: false,
                allow_blank: false
            };

            options = _.extend(default_options, options || {});

            // validation disabled || attribute already has error (do not overwrite/stack)
            if (!options.if || !_.isUndefined(errors[attr])) return errors;

            if (_.isUndefined(options.min) && _.isUndefined(options.max)) {
                throw Error('options must define min or max');
            }

            var attribute = options.trim && _.isString(attrs[attr]) ? attrs[attr].trim() : attrs[attr];

            if (options.allow_blank && is_blank(attribute)) return errors;
            if (is_blank(attribute) && (_.isUndefined(options.min) || options.min == 0)) return errors;

            if ((options.min === options.max && attribute.length !== options.min) || is_blank(attribute)) {
                errors[attr] = I18n.t('errors.validation.wrong_length', { count: options.min });
            } else {
                if (attribute.length < options.min) {
                    errors[attr] = I18n.t('errors.validation.too_short', { count: options.min });
                } else if (attribute.length > options.max) {
                    errors[attr] = I18n.t('errors.validation.too_long', { count: options.max });
                }
            }

            return errors;
        },


        /**
         * Validates attribute to be numeric.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param [options] {object} - Options to override default options.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.only_integer=false] {boolean} - Only integers will be accepted as valid.
         * @param [options.message=I18n.t('errors.validation.no_number')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_numericality_of: function(attr, attrs, errors, options) {
            var default_options = {
                if: true,
                allow_blank: false,
                only_integer: false,
                message: I18n.t('errors.validation.no_number')
            };

            options = _.extend(default_options, options || {});

            // validation disabled || attribute already has error (do not overwrite/stack)
            if (!options.if || !_.isUndefined(errors[attr])) return errors;

            if (options.allow_blank && is_blank(attrs[attr])) return errors;

            if (!_.isNumber(attrs[attr]) || _.isNaN(attrs[attr]) || (options.only_integer && attrs[attr] % 1 !== 0)) {
                errors[attr] = options.message;
            }

            return errors;
        },


        /**
         * Validates presence of text for given attribute.
         *
         * @param attr {string} - Name of the attribute to be checked.
         * @param attrs {object} - Object containing model attributes, given by backbone validate().
         * @param errors {object} - Object containing already existing error messages.
         * @param options {object} - Options to override default options.
         * @param [options.if=true] {boolean} - Only check attribute if the condition is met.
         * @param [options.allow_blank=false] {boolean} - Empty attribute will be accepted as valid.
         * @param [options.message=I18n.t('errors.validation.empty')] {string} - Error message to be used.
         * @returns {object} - Extended version of given errors object.
         */
        validates_presence_of: function(attr, attrs, errors, options) {
            var default_options = {
                if: true,
                allow_blank: false,
                message: I18n.t('errors.validation.empty')
            };

            options = _.extend(default_options, options || {});

            // validation disabled || attribute already has error (do not overwrite/stack)
            if (!options.if || !_.isUndefined(errors[attr])) return errors;

            if (!options.allow_blank && is_blank(attrs[attr])) {
                errors[attr] = options.message;
            }

            return errors;
        }
    }
});