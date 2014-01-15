<ol class="breadcrumb">
    <li><a href=""><%= I18n.t('main_navi.home') %></a></li>
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

<a href="<%= url_for('tasks', 'new') %>" class="btn btn-default btn-sm btn-text top-space js-create">
    <span class="glyphicon glyphicon-plus"></span> <%= I18n.t('task.button.new') %>
</a>
