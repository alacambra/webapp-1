/**
 * Checks if an object contains empty data.
 *
 * @param data
 * @returns {boolean} - True if object is empty.
 */
function is_empty(data) {
    if (data === undefined || data === null) return true; // undefined and null is empty
    var type = typeof data;
    if (type === 'string') return !data.length; // any string (including whitespace) is not empty
    if (type === 'boolean') return !data; // false is empty, true is not empty
    if (type === 'number') return false; // any number is no empty
    if (type === 'object') {
        return is_array(data) ? !data.length : !Object.keys(data).length; // check array size and object key count
    }
    return false;
}


/**
 * Checks if a string only contains whitespace. Behaves like is_empty() for non-string objects.
 *
 * @param data
 * @returns {boolean} - True if only whitespace or empty object.
 */
function is_blank(data) {
    if (typeof data === 'string') return !/\S/.test(data); // check for non-whitespace characters
    return is_empty(data); // fallback
}


/**
 * Checks if a given object is an array.
 *
 * @param a {object} - The object to be checked.
 * @returns {boolean} - If the object is an array.
 */
function is_array(a) {
    return Object.prototype.toString.apply(a) === '[object Array]';
}
