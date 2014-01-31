<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.pools', path('pools', 'list')) %></li>
    <li class="active"><%= name %></li>
</ol>

<div><%= textile(description) %></div>

<p><%= I18n.t('pool.label.street') %>: <%= street %></p>
<p><%= I18n.t('pool.label.house_number') %>: <%= houseNumber %></p>
<p><%= I18n.t('pool.label.city') %>: <%= city %></p>
<p><%= I18n.t('pool.label.zip') %>: <%= zip %></p>
<p><%= I18n.t('pool.label.country') %>: <%= country_text(country) %></p>
<p><%= I18n.t('pool.label.email') %>: <a href="mailto:<%= email %>"><%= email %></a></p>
<p><%= I18n.t('pool.label.website') %>: <a href="<%= website %>" target="_blank"><%= website %></a></p>
<p><%= I18n.t('pool.label.founding_date') %>: <%= format_date(foundingDate) %></p>
<p><%= I18n.t('pool.label.employee_count') %>: <%= employee_count_text(employeeCount) %></p>
<p><%= I18n.t('pool.label.phone') %>: <%= phone %></p>
<p><%= I18n.t('pool.label.fax') %>: <%= fax %></p>

<%= button_to('edit', path('pools', 'edit', id), { icon: 'pencil', class: 'right-space' }) %>

<button type="button" class="btn btn-default btn-sm btn-text js-delete-pool">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>
