define(['config'], function (CONFIG) {
    return describe('App', function () {
        function keys_to_json(data) {
            var result = [];
            _.each(data, function(value, key) {
                result.push(key);
                if (_.isObject(value)) result.push(keys_to_json(value));
            });
            return JSON.stringify(result);
        }

        var default_locale = CONFIG.i18n.default_locale,
            origin = keys_to_json(I18n.translations[default_locale]);

        _.each(CONFIG.i18n.available_locales, function(locale) {
            if (locale != CONFIG.i18n.default_locale) {
                it('Locales must have identical keys (' + (default_locale + '<->' + locale).toUpperCase() + ')', function () {
                    expect(keys_to_json(I18n.translations[locale]) == origin).toBeTruthy();
                });
            }
        });
    });
});