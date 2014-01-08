<div class="col-md-3 js-show"><a href="<%= url_for('users', id) %>"><%= full_name(firstName, lastName) %></a></div>
<div class="col-md-2"><%= format_date(birthDate) %>&nbsp;</div>
<div class="col-md-6"><a href="mailto:<%= email %>"><%= email %></a>&nbsp;</div>
<div class="col-md-1 buttons">
    <a href="<%= url_for('users', 'edit', id) %>" class="btn btn-default btn-xs js-edit">
        <span class="glyphicon glyphicon-pencil"></span>
    </a>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
