<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.tasks', path('tasks', 'list')) %></li>
    <li><%= link_to('main_navi.task', path('tasks', 'show', task_id)) %></li>
    <li><%= link_to('main_navi.efforts', path('efforts', 'list', task_id)) %></li>
    <li class="active"><%= I18n.t('main_navi.effort') %></li>
</ol>

<p><%= I18n.t('effort.label.date') %>: <%= format_date(date) %></p>
<p><%= I18n.t('effort.label.time') %>: <%= format_time(time) %></p>
<p><%= I18n.t('effort.label.comment') %>: <%= comment %></p>

<%= button_to('edit', path('efforts', 'edit', task_id, id), { icon: 'pencil', class: 'right-space' }) %>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>