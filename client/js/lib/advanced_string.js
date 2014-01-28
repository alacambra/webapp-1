// Default padding is '0' and default length is 2, both are optional.
function pad(n, padding, length) {
    // pad(n, <length>)
    if (typeof padding === 'number') {
        length = padding;
        padding = '0';
    }

    // Defaults handle pad(n) and pad(n, <padding>)
    if (padding == null) {
        padding = '0';
    }
    length = length || 2;

    var s = String(n);
    // padding may be an empty string, don't loop forever if it is
    if (padding) {
        while (s.length < length) s = padding + s;
    }
    return s;
}


// 'foo_bar' -> 'FooBar'
$.extend(String.prototype, {
    classify: function () {
        return this.replace (/(?:^|[-_])(\w)/g, function (_, c) {
            return c ? c.toUpperCase () : '';
        })
    }
});


// 'foo_bar' -> 'fooBar'
$.extend(String.prototype, {
    camelize: function () {
        var s = this.classify();
        return s.charAt(0).toLowerCase() + s.substr(1);
    }
});

// 'FooBar' -> 'foo_bar'
$.extend(String.prototype, {
    underscore: function () {
        return this.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    }
});

// ' FooBar ' -> 'FooBar'
$.extend(String.prototype, {
    trim: function () {
        return this.replace(/^\s+|\s+$/g,'');
    }
});