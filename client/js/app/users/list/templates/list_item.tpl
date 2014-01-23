<div class="col-md-3"><%= link_to(full_name(firstName, lastName), path('users', 'show', id), { i18n: false }) %></div>
<div class="col-md-2"><%= format_date(birthDate) %>&nbsp;</div>
<div class="col-md-6"><a href="mailto:<%= email %>"><%= email %></a>&nbsp;</div>
<div class="col-md-1 buttons">
    <%= button_to('', path('users', 'edit', id), { icon: 'pencil', class: 'btn-xs' }) %>
    <button type="button" class="btn btn-default btn-xs js-delete-user">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
