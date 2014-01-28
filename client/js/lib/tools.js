/** @module tools */

/**
 * Checks if an object contains empty data.
 *
 * @param data {string|object} - Array, Object or String to be checked, any type is supported.
 * @returns {boolean} - True if object is empty.
 */
function is_empty(data) {
    if (data === undefined || data === null) return true; // undefined and null is empty
    var type = typeof data;
    if (type === 'string') return !data.length; // any string (including whitespace) is not empty
    if (type === 'boolean') return !data; // false is empty, true is not empty
    if (type === 'number') return false; // any number is no empty
    if (type === 'object') {
        return _.isArray(data) ? !data.length : !Object.keys(data).length; // check array size and object key count
    }
    return false;
}


/**
 * Checks if a string only contains whitespace. Behaves like {@link is_empty} for non-string objects.
 *
 * @param data {string|object} - String, Array or Object to be checked, any type is supported.
 * @returns {boolean} - True if only whitespace or empty object.
 */
function is_blank(data) {
    if (typeof data === 'string') return !/\S/.test(data); // check for non-whitespace characters
    return is_empty(data); // fallback
}

/**
 * Checks if specified data is a string or a number.
 *
 * @param data {*} - to be checked
 * @returns {boolean} - true when data is string or number else false
 */
function is_string_or_number(data) {
    return _.isString(data) || _.isNumber(data);
}
