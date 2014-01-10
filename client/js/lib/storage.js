define(function() {
    function Storage() {
        this.set = function(key, data, expire) {
            var store = {
                data: data,
                expire: false
            };

            if (typeof expire != undefined) {
                store.expire = new Date().getTime() + (expire * 24 * 60 * 60 * 1000);
            }

            localStorage.setItem(key, JSON.stringify(store));
        };

        this.get = function(key, default_value) {
            if (typeof default_value == 'undefined') default_value = null;

            var item = localStorage.getItem(key);

            if (!item) return default_value;

            var store = JSON.parse(item);

            if (store.expire && (new Date().getTime() > store.expire)) {
                return default_value;
            }

            return store.data;
        };

        this.unset = function(key) {
            localStorage.removeItem(key);
        };
    }

    return Storage;
});
