define(['app/view_helper', 'moment', 'advanced_string'], function(view_helper) {
    return {
        format_date: function(date) {
            return this.has_value(date) ? view_helper.format_date(date) : '';
        },

        format_time: function(time) {
            return this.has_value(time) ? view_helper.format_time(time) : '';
        },

        confirm_text: function(effort) {
            if (is_blank(effort.get('comment'))) {
                return this.format_date(effort.get('date')) + ', ' + this.format_time(effort.get('time'));
            } else {
                return effort.get('comment');
            }
        },

        unformat_time: function (time) {
            return view_helper.unformat_time(time);
        },

        unformat: function(data) {
            data.date = this.has_value(data.date) ? view_helper.unformat_date(data.date) : 0;
            data.time = this.unformat_time(data.time);
            return data;
        },

        has_value: function(val) {
            return !(val === 0 || is_blank(val));
        }
    }
});
