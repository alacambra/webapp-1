<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.people', path('users', 'list')) %></li>
    <li class="active"><%= full_name(firstName, lastName) %></li>
</ol>

<p><%= I18n.t('user.label.first_name') %>: <%= firstName %></p>
<p><%= I18n.t('user.label.last_name') %>: <%= lastName %></p>
<p><%= I18n.t('user.label.birth_date') %>: <%= format_date(birthDate) %></p>
<p><%= I18n.t('user.label.email') %>: <%= email %></p>

<%= button_to('edit', path('users', 'edit', id), { icon: 'pencil', class: 'right-space' }) %>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>