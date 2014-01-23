<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li class="active"><%= I18n.t('main_navi.projects') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('project.label.title') %></div>
    <div class="col-md-4"><%= I18n.t('project.label.description') %></div>
    <div class="col-md-1"><%= I18n.t('project.label.task_count') %></div>
    <div class="col-md-1"><%= I18n.t('project.label.status') %></div>
    <div class="col-md-1"><%= I18n.t('project.label.start_date') %></div>
    <div class="col-md-1"><%= I18n.t('project.label.end_date') %></div>
</div>

<div id="js-project-list-items"></div>

<%= button_to('project.button.new', path('projects', 'create'), { icon: 'plus', class: 'top-space' }) %>