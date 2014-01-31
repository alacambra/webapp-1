<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.projects', path('projects', 'list')) %></li>
    <% if (!is_new_action()) {  %>
        <li><%= link_to(title, path('projects', 'show', id), { i18n: false }) %></li>
    <% } %>
    <li class="active"><%= I18n.t(is_new_action() ? 'new' : 'edit') %></li>
</ol>

<form>
    <fieldset>
        <div class="row">
            <div class="col-lg-4">
                <div class="form-group">
                    <label class="control-label" for="js-project-title"><%= I18n.t('project.label.title') %></label>
                    <input id="js-project-title" type="text" name="title" value="<%= title %>" class="form-control">
                </div>

                <div class="form-group">
                    <label class="control-label" for="js-project-description"><%= I18n.t('project.label.description') %></label>
                    <textarea id="js-project-description" name="description" class="form-control" rows="4" maxlength="5000"><%= description %></textarea>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="form-group">
                    <label class="control-label"><%= I18n.t('project.label.status') %></label>
                    <%= select_for('project', 'status', { class: 'form-control', selected: status }) %>
                </div>

                <div class="form-group project-slider-group">
                    <label class="control-label" for="js-project-progress"><%= I18n.t('project.label.progress') %></label>
                    <input id="js-project-progress" type="text" name="progress">
                    <span class="slider-label">%</span>
                    <div id="js-project-progress-slider"></div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="form-group">
                    <label class="control-label" for="js-project-start-date"><%= I18n.t('project.label.start_date') %></label>
                    <input id="js-project-start-date" type="text" name="startDate" value="<%= format_date(startDate) %>" class="form-control">
                </div>

                <div class="form-group">
                    <label class="control-label" for="js-project-end-date"><%= I18n.t('project.label.end_date') %></label>
                    <input id="js-project-end-date" type="text" name="endDate" value="<%= format_date(endDate) %>" class="form-control">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12">
                <button id="js-pool-submit" class="btn btn-default btn-sm btn-text right-space js-submit">
                    <span class="glyphicon glyphicon-floppy-disk"></span> <%= I18n.t('save') %>
                </button>

                <span id="js-pool-submit-error-msg" class="text-danger" style="display: none"></span>

                <img id="js-pool-save-indicator" src="img/load_indicator.gif" style="display: none;">
            </div>
        </div>
    </fieldset>
</form>
