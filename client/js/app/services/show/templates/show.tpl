<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.services', path('services', 'list')) %></li>
    <li class="active"><%= name %></li>
</ol>

<div><%= textile(description) %></div>

<%= button_to('edit', path('services', 'edit', id), { icon: 'pencil', class: 'right-space' }) %>
