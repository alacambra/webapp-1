<h2><%= I18n.t('effort.header.list') %></h2>

<div class="list-row header">
    <div class="col-md-3"><%= I18n.t('effort.label.date') %></div>
    <div class="col-md-3"><%= I18n.t('effort.label.time') %></div>
    <div class="col-md-5"><%= I18n.t('effort.label.comment') %></div>
</div>

<div id="js-effort-list-items"></div>

<a href="#tasks/<%= task_id %>/efforts/new" class="btn btn-default btn-sm btn-text top-space js-create">
    <span class="glyphicon glyphicon-plus"></span> <%= I18n.t('effort.button.new') %>
</a>
