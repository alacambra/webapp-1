<h2><%= title %></h2>
<p><%= description %></p>
<br />
<p><%= I18n.t('task.label.status') %>: <%= status_text(status) %></p>
<p><%= I18n.t('task.label.priority') %>: <%= priority_text(priority) %>&nbsp;</p>
<p><%= I18n.t('task.label.start_date') %>: <%= format_date(startDate) %>&nbsp;</p>
<p><%= I18n.t('task.label.end_date') %>: <%= format_date(endDate) %>&nbsp;</p>
<p><%= I18n.t('task.label.duration') %>: <%= format_duration(duration) %>&nbsp;</p>
<p><%= I18n.t('task.label.progress') %>: <%= format_progress(progress) %>&nbsp;</p>

<a href="#tasks/<%= id %>/edit" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> <%= I18n.t('edit') %>
</a>
<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>