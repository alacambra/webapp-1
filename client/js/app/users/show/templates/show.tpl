<ol class="breadcrumb">
    <li><a href="">Home</a></li>
    <li><a href="#users">Users</a></li>
    <li class="active"><%= full_name(firstName, lastName) %></li>
</ol>

<p><%= I18n.t('user.label.first_name') %>: <%= firstName %></p>
<p><%= I18n.t('user.label.last_name') %>: <%= lastName %></p>
<p><%= I18n.t('user.label.birth_date') %>: <%= format_date(birthDate) %></p>
<p><%= I18n.t('user.label.email') %>: <%= email %></p>

<a href="<%= url_for('users', 'edit', id) %>" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> <%= I18n.t('edit') %>
</a>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>