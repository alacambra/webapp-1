<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li class="active"><%= I18n.t('main_navi.services') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('service.label.name') %></div>
    <div class="col-md-8"><%= I18n.t('service.label.description') %></div>
</div>

<div id="js-service-list-items"></div>

<%= button_to('service.button.new', path('services', 'create'), { icon: 'plus', class: 'top-space' }) %>