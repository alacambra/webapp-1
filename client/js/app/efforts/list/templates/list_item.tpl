<div class="col-md-3 js-show"><a href="<%= url_for('tasks', task_id, 'efforts', id) %>"><%= format_date(date) %></a></div>
<div class="col-md-3"><%= format_time(time) %>&nbsp;</div>
<div class="col-md-5"><%= comment %>&nbsp;</div>

<div class="col-md-1 buttons">
    <!--a href="<%= url_for('tasks', task_id, url_for('efforts', 'edit', id)) %>" class="btn btn-default btn-xs js-edit"-->
    <a href="<%= build_url('tasks', task_id, 'efforts', id, 'edit') %>" class="btn btn-default btn-xs js-edit">
        <span class="glyphicon glyphicon-pencil"></span>
    </a>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
