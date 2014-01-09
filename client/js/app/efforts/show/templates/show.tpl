<p><%= I18n.t('effort.label.date') %>: <%= format_date(date) %></p>
<p><%= I18n.t('effort.label.time') %>: <%= time %></p>
<p><%= I18n.t('effort.label.comment') %>: <%= comment %></p>

<a href="<%= url_for('efforts', 'edit', id) %>" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> <%= I18n.t('edit') %>
</a>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>