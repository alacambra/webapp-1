<ol class="breadcrumb">
    <li><a href="">Home</a></li>
    <li><a href="#projects">Projects</a></li>
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