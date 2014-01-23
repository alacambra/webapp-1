<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.projects', path('projects', 'list')) %></li>
    <li class="active"><%= title %></li>
</ol>

<div><%= textile(description) %></div>

<p><%= I18n.t('project.label.title') %>: <%= title %></p>
<p><%= I18n.t('project.label.status') %>: <%= status_text(status) %></p>
<p><%= I18n.t('project.label.start_date') %>: <%= format_date(startDate) %></p>
<p><%= I18n.t('project.label.end_date') %>: <%= format_date(endDate) %></p>

<%= button_to('edit', path('projects', 'edit', id), { icon: 'pencil', class: 'right-space' }) %>

<button type="button" class="btn btn-default btn-sm btn-text js-delete-project">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>

<div id="project_tasks"></div>

