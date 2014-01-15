<ol class="breadcrumb">
    <li><a href=""><%= I18n.t('main_navi.home') %></a></li>
    <li><a href="#tasks"><%= I18n.t('main_navi.tasks') %></a></li>
    <li><a href="#tasks/<%= task_id %>"><%= I18n.t('main_navi.task') %></a></li>
    <li class="active"><%= I18n.t('main_navi.efforts') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('effort.label.date') %></div>
    <div class="col-md-3"><%= I18n.t('effort.label.time') %></div>
    <div class="col-md-5"><%= I18n.t('effort.label.comment') %></div>
</div>

<div id="js-effort-list-items"></div>

<a href="<%= url_for('tasks', task_id, 'efforts', 'new') %>" class="btn btn-default btn-sm btn-text top-space js-create">
    <span class="glyphicon glyphicon-plus"></span> <%= I18n.t('effort.button.new') %>
</a>
