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
