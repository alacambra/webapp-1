<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li class="active"><%= I18n.t('main_navi.people') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('user.label.full_name') %></div>
    <div class="col-md-2"><%= I18n.t('user.label.birth_date') %></div>
    <div class="col-md-6"><%= I18n.t('user.label.email') %></div>
</div>

<div id="js-user-list-items"></div>

<%= button_to('user.button.new', path('users', 'create'), { icon: 'plus', class: 'top-space' }) %>