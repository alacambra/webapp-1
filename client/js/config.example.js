/** @module config */

define({
    /**
     * @desc Configures REST interface.
     * @property version {string} - Defines the version numer, which will appear at bottom right of page if set.
     */
    version: '0.1.1',
    /**
     * @desc Configures REST interface.
     * @property base_url {object} - Paths to be prefixed for REST calls.
     * @property base_url.default {string} - Default path to be used if subdomain switch is disabled or could not select path.
     * @property [base_url.dev] {string} - Optional REST server url, will be switched by subdomain, i.e. dev.poolingpeople.de (if enabled). (Multiple definitions are possible)
     * @property base_url_switch_by_subdomain {boolean} - Enables/disables subdomain switch for REST server urls. (Should be disabled in production environment)
     * @property faux.enable {boolean} - Enable/disable faux server. Must be disabled to build app!
     * @property faux.log_rest {boolean} - Enable/disable REST logging by faux server.
     */
    rest: {
        base_url: {
            default: '/webapplication/rest',
            dev: '/api'
        },
        base_url_switch_by_subdomain: false,
        faux: {
            enable: false,
            log_rest: false
        }
    },

    /**
     * @desc Configures internationalization.
     * @property available_locales {string[]} - Locale names which should be available via UI language selector or
     *   by automatic browser detection.
     * @property default_locale {string} - Locale to be used if none was selected or detected.
     */
    i18n: {
        available_locales: ['en', 'de'],
        default_locale: 'en'
    }
});
