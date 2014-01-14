<div class="col-md-2 js-show"><a href="<%= url_for('tasks', id) %>"><%= truncate(title, 25) %></a></div>
<div class="col-md-2"><%= truncate(description, 25) %>&nbsp;</div>
<div class="col-md-1"><%= status_text(status) %>&nbsp;</div>
<div class="col-md-1"><%= priority_text(priority) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(startDate) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(endDate) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(duration) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(effort) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_progress(progress) %> %&nbsp;</div>
<div class="col-md-1 buttons">
    <a href="<%= url_for('tasks', 'edit', id) %>" class="btn btn-default btn-xs js-edit">
        <span class="glyphicon glyphicon-pencil"></span>
    </a>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
