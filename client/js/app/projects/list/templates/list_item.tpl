<div class="col-md-3"><%= link_to(truncate(title, 25), path('projects', 'show', id), { i18n: false }) %></div>
<div class="col-md-5"><%= truncate(description, 20) %>&nbsp;</div>
<div class="col-md-1"><%= status_text(status) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(startDate) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(endDate) %>&nbsp;</div>
<div class="col-md-1 buttons">
    <%= button_to('', path('projects', 'edit', id), { icon: 'pencil', class: 'btn-xs' }) %>
    <button type="button" class="btn btn-default btn-xs js-delete-project">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
