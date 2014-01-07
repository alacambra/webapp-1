<div class="col-md-3 js-show"><a href="<%= url_for('projects', id) %>"><%= title %></a></div>
<div class="col-md-5"><%= truncate(description, 20) %>&nbsp;</div>
<div class="col-md-1"><%= status_text(status) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(startDate) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(endDate) %>&nbsp;</div>
<div class="col-md-1 buttons">
    <a href="<%= url_for('projects', 'edit', id) %>" class="btn btn-default btn-xs js-edit">
        <span class="glyphicon glyphicon-pencil"></span>
    </a>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
