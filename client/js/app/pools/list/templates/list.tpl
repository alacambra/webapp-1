<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li class="active"><%= I18n.t('main_navi.pools') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('pool.label.name') %></div>
    <div class="col-md-8"><%= I18n.t('pool.label.description') %></div>
</div>

<div id="js-pool-list-items"></div>

<%= button_to('pool.button.new', path('pools', 'create'), { icon: 'plus', class: 'top-space' }) %>