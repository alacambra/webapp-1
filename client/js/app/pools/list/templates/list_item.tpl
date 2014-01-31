<div class="col-md-3"><%= link_to(name, path('pools', 'show', id), { i18n: false }) %></div>
<div class="col-md-8"><%= truncate(description, 110) %>&nbsp;</div>
<div class="col-md-1 buttons">
    <%= button_to('', path('pools', 'edit', id), { icon: 'pencil', class: 'btn-xs' }) %>
    <button type="button" class="btn btn-default btn-xs js-delete-pool">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
