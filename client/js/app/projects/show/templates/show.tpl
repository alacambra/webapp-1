<ol class="breadcrumb">
    <li><a class="js-home" href="<%= url_for('') %>"><%= I18n.t('main_navi.home') %></a></li>
    <li><a class="js-projects" href="<%= url_for('projects') %>"><%= I18n.t('main_navi.projects') %></a></li>
    <li class="active"><%= title %></a></li>

</ol>

<div><%= textile(description) %></div>

<p><%= I18n.t('project.label.status') %>: <%= status_text(status) %></p>
<p><%= I18n.t('project.label.start_date') %>: <%= format_date(startDate) %></p>
<p><%= I18n.t('project.label.end_date') %>: <%= format_date(endDate) %></p>

<a href="<%= url_for('projects', 'edit', id) %>" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> <%= I18n.t('edit') %>
</a>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>