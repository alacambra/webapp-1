<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li class="active"><%= I18n.t('main_navi.tasks') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-2"><%= I18n.t('task.label.title') %></div>
    <div class="col-md-2"><%= I18n.t('task.label.description') %></div>
    <div class="col-md-1"><%= I18n.t('task.label.status') %></div>
    <div class="col-md-1"><%= I18n.t('task.label.priority') %></div>
    <div class="col-md-1"><%= I18n.t('task.label.start_date') %></div>
    <div class="col-md-1"><%= I18n.t('task.label.end_date') %></div>
    <div class="col-md-1"><%= I18n.t('task.label.duration_short') %></div>
    <div class="col-md-1"><%= I18n.t('task.label.effort_short') %></div>
    <div class="col-md-1"><%= I18n.t('task.label.progress') %></div>
</div>

<div id="js-task-list-items"></div>

<%= button_to('task.button.new', path('tasks', 'create'), { icon: 'plus', class: 'top-space' }) %>