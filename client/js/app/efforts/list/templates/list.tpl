<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.tasks', path('tasks', 'list')) %></li>
    <li><%= link_to('main_navi.task', path('tasks', 'show', task_id)) %></li>
    <li class="active"><%= I18n.t('main_navi.efforts') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('effort.label.date') %></div>
    <div class="col-md-3"><%= I18n.t('effort.label.time') %></div>
    <div class="col-md-5"><%= I18n.t('effort.label.comment') %></div>
</div>

<div id="js-effort-list-items"></div>

<%= button_to('effort.button.new', path('efforts', 'create', task_id), { icon: 'plus', class: 'top-space' }) %>
