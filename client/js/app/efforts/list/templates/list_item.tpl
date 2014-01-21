<div class="col-md-3"><%= link_to(format_date(date), path('efforts', 'show', task_id, id), { i18n: false } ) %></div>
<div class="col-md-3"><%= format_time(time) %>&nbsp;</div>
<div class="col-md-5"><%= comment %>&nbsp;</div>

<div class="col-md-1 buttons">
    <%= button_to('', path('efforts', 'edit', task_id, id), { icon: 'pencil', class: 'btn-xs' }) %>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
