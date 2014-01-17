<ol class="breadcrumb">
    <li><a class="js-home" href="<%= url_for('') %>"><%= I18n.t('main_navi.home') %></a></li>
    <li class="active"><%= I18n.t('main_navi.people') %></li>
</ol>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('user.label.full_name') %></div>
    <div class="col-md-2"><%= I18n.t('user.label.birth_date') %></div>
    <div class="col-md-6"><%= I18n.t('user.label.email') %></div>
</div>

<div id="js-user-list-items"></div>

<a href="<%= url_for('users', 'new') %>" class="btn btn-default btn-sm btn-text top-space js-create">
    <span class="glyphicon glyphicon-plus"></span> <%= I18n.t('user.button.new') %>
</a>
