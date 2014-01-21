<div class="col-md-2"><%= link_to(truncate(title, 25), path('tasks', 'show', id), { i18n: false }) %></div>
<div class="col-md-2"><%= truncate(description, 25) %>&nbsp;</div>
<div class="col-md-1"><%= status_text(status) %>&nbsp;</div>
<div class="col-md-1"><%= priority_text(priority) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(startDate) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(endDate) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(duration) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(effort) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_progress(progress) %> %&nbsp;</div>
<div class="col-md-1 buttons">
    <%= button_to('', path('tasks', 'edit', id), { icon: 'pencil', class: 'btn-xs' }) %>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
