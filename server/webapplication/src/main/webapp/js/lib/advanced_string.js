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