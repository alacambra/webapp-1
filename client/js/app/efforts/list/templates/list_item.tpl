<div class="col-md-3 js-show"><a href="<%= url_for('efforts', id) %>"><%= format_date(date) %></a></div>
<div class="col-md-3"><%= time %>&nbsp;</div>
<div class="col-md-5"><%= comment %>&nbsp;</div>

<div class="col-md-1 buttons">
    <a href="<%= url_for('efforts', 'edit', id) %>" class="btn btn-default btn-xs js-edit">
        <span class="glyphicon glyphicon-pencil"></span>
    </a>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
