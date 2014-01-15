<ol class="breadcrumb">
    <li><a href=""><%= I18n.t('main_navi.home') %></a></li>
    <li><a href="#projects"><%= I18n.t('main_navi.projects') %></a></li>
    <% if (Backbone.history.location.hash.indexOf('new') < 0) { %>
    <li><a href="#projects/<%= id %>"><%= title %></a></li>
    <% } %>
    <li class="active"><%= I18n.t(Backbone.history.location.hash.indexOf('new') > -1 ? 'new' : 'edit') %></li>
</ol>

<form class="form-horizontal" role="form">
    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-project-title"><%= I18n.t('project.label.title') %></label>
            <input id="js-project-title" type="text" name="title" value="<%= title %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-project-description"><%= I18n.t('project.label.description') %></label>
            <textarea id="js-project-description" name="description" class="form-control" rows="4" maxlength="5000"><%= description %></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label"><%= I18n.t('project.label.status') %></label>
            <%= select_for('project', 'status', { class: 'form-control', selected: status }) %>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-project-startDate"><%= I18n.t('project.label.start_date') %></label>
            <input id="js-project-startDate" type="text" name="startDate" value="<%= format_date(startDate) %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-project-endDate"><%= I18n.t('project.label.end_date') %></label>
            <input id="js-project-endDate" type="text" name="endDate" value="<%= format_date(endDate) %>" class="form-control">
        </div>
    </div>

    <button id="js-project-submit" class="btn btn-default btn-sm btn-text right-space js-submit">
        <span class="glyphicon glyphicon-floppy-disk"></span> <%= I18n.t('save') %>
    </button>

    <span id="js-project-submit-error-msg" class="text-danger" style="display: none"></span>

    <img id="js-project-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>
