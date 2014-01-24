define(['app/view_helper',
        'advanced_string'],
function(view_helper) {
    return {
        format_date: function(date) {
            return !is_blank(date) ? view_helper.format_date(date) : '';
        },

        format_time: function(time) {
            return !is_blank(time) ? view_helper.format_time(time) : '';
        },

        confirm_text: function(effort) {
            if (is_blank(effort.get('comment'))) {
                return this.format_date(effort.get('date')) + ', ' + this.format_time(effort.get('time'));
            } else {
                return effort.get('comment');
            }
        },

        unformat_time: function(time) {
            return view_helper.unformat_time(time);
        },

        unformat: function(data) {
            data.date = !is_blank(data.date) ? view_helper.unformat_date(data.date) : null;
            data.time = this.unformat_time(data.time);
            return data;
        }
    }
});
