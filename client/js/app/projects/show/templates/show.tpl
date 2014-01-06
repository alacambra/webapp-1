<h2><%= title %></h2>
<%= textile(description) %>
<br />
<p><%= I18n.t('project.label.status') %>: <%= status_text(status) %></p>
<p><%= I18n.t('project.label.start_date') %>: <%= format_date(startDate) %>&nbsp;</p>
<p><%= I18n.t('project.label.end_date') %>: <%= format_date(endDate) %>&nbsp;</p>

<a href="<%= url_for('projects', 'edit', id) %>" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> <%= I18n.t('edit') %>
</a>
<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>