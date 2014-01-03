/** @module app_helper */

define({
    /**
     * Creates a backbone REST URL for a given resource.
     *
     * @example
     * // returns #tasks/17
     * url_for('tasks', 17)
     *
     * @example
     * // returns #tasks/23/edit
     * url_for('tasks', 'edit', 23)
     *
     * @param name {string} - Resource or model name.
     * @param action_or_id {string|number} - REST action or ID of the resource if action is omitted.
     * @param [id] {number} - ID of the resource, only if action is set explicit.
     * @returns {string} - REST URL.
     */
    url_for: function(name, action_or_id, id) {
        var action = null;

        if (id === undefined) {
            id = action_or_id;
        } else {
            action = action_or_id;
        }

        var link = '#' + name;

        if (id !== undefined) link += '/' + id;
        if (action !== null) link += '/' + action;

        return link;
    }
});