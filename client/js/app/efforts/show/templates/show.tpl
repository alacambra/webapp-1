<ol class="breadcrumb">
    <li><a class="js-home" href="<%= url_for('') %>"><%= I18n.t('main_navi.home') %></a></li>
    <li><a class="js-tasks" href="<%= url_for('tasks') %>"><%= I18n.t('main_navi.tasks') %></a></li>
    <li><a class="js-task" href="<%= url_for('tasks', task_id) %>"><%= I18n.t('main_navi.task') %></a></li>
    <li><a class="js-efforts" href="<%= url_for('tasks', task_id, 'efforts') %>"><%= I18n.t('main_navi.efforts') %></a></li>
    <li class="active"><%= I18n.t('main_navi.effort') %></li>
</ol>

<p><%= I18n.t('effort.label.date') %>: <%= format_date(date) %></p>
<p><%= I18n.t('effort.label.time') %>: <%= format_time(time) %></p>
<p><%= I18n.t('effort.label.comment') %>: <%= comment %></p>

<a href="<%= build_url('tasks', task_id, 'efforts', id, 'edit') %>" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> <%= I18n.t('edit') %>
</a>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>