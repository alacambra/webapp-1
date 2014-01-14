<ol class="breadcrumb">
    <li><a href="">Home</a></li>
    <li class="active"><%= I18n.t('project.header.list') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('project.label.title') %></div>
    <div class="col-md-5"><%= I18n.t('project.label.description') %></div>
    <div class="col-md-1"><%= I18n.t('project.label.status') %></div>
    <div class="col-md-1"><%= I18n.t('project.label.start_date') %></div>
    <div class="col-md-1"><%= I18n.t('project.label.end_date') %></div>
</div>

<div id="js-project-list-items"></div>

<a href="<%= url_for('projects', 'new') %>" class="btn btn-default btn-sm btn-text top-space js-create">
    <span class="glyphicon glyphicon-plus"></span> <%= I18n.t('project.button.new') %>
</a>
