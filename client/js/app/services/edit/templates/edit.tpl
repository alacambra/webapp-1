<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.services', path('services', 'list')) %></li>
    <% if (!is_new_action()) {  %>
        <li><%= link_to(name, path('services', 'show', id), { i18n: false }) %></li>
    <% } %>
    <li class="active"><%= I18n.t(is_new_action() ? 'new' : 'edit') %></li>
</ol>

<form class="form-horizontal" role="form">
    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-service-name"><%= I18n.t('service.label.name') %></label>
            <input id="js-service-name" type="text" name="name" value="<%= name %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-service-description"><%= I18n.t('service.label.description') %></label>
            <textarea id="js-service-description" name="description" class="form-control" rows="4" maxlength="5000"><%= description %></textarea>
        </div>
    </div>

    <button id="js-service-submit" class="btn btn-default btn-sm btn-text right-space js-submit">
        <span class="glyphicon glyphicon-floppy-disk"></span> <%= I18n.t('save') %>
    </button>

    <span id="js-service-submit-error-msg" class="text-danger" style="display: none"></span>

    <img id="js-service-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>