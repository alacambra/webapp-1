<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <% if (project) { %>
        <li><%= link_to('main_navi.projects', path('projects', 'list')) %></li>
        <li><%= link_to('task.label.project', path('projects', 'show', project.id)) %></li>
    <% } %>
    <li><%= link_to('main_navi.tasks', path('tasks', 'list')) %></li>
    <% if (!is_new_action()) {  %>
        <li><%= link_to(title, path('tasks', 'show', id), { i18n: false }) %></li>
    <% } %>
    <li class="active"><%= I18n.t(is_new_action() ? 'new' : 'edit') %></li>
</ol>

<form>
    <fieldset>
        <div class="row">
            <div class="col-lg-4">
                <div class="form-group">
                    <label class="control-label" for="js-task-title"><%= I18n.t('task.label.title') %></label>
                    <input id="js-task-title" type="text" name="title" value="<%= title %>" class="form-control">
                </div>

                <div class="form-group">
                    <label class="control-label" for="js-task-description"><%= I18n.t('task.label.description') %></label>
                    <textarea id="js-task-description" name="description" class="form-control resize-vertical" rows="4" maxlength="5000"><%= description %></textarea>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="form-group">
                    <label class="control-label"><%= I18n.t('task.label.priority') %></label>
                    <%= select_for('task', 'priority', { class: 'form-control', selected: priority }) %>
                </div>

                <div class="form-group">
                    <label class="control-label"><%= I18n.t('task.label.status') %></label>
                    <%= select_for('task', 'status', { class: 'form-control', selected: status }) %>
                </div>

                <div class="form-group task-slider-group">
                    <label class="control-label" for="js-task-progress"><%= I18n.t('task.label.progress') %></label>
                    <input id="js-task-progress" type="text" name="progress">
                    <span class="slider-label">%</span>
                    <div id="js-task-progress-slider"></div>
                </div>
            </div>

            <div class="col-lg-4">
                <div class="form-group">
                    <label class="control-label" for="js-task-start-date"><%= I18n.t('task.label.start_date') %></label>
                    <input id="js-task-start-date" type="text" name="startDate" value="<%= format_date(startDate) %>" class="form-control">
                </div>

                <div class="form-group">
                    <label class="control-label" for="js-task-end-date"><%= I18n.t('task.label.end_date') %></label>
                    <input id="js-task-end-date" type="text" name="endDate" value="<%= format_date(endDate) %>" class="form-control">
                </div>

                <div class="form-group task-slider-group">
                    <label class="control-label" for="js-task-duration"><%= I18n.t('task.label.duration') %></label>
                    <input id="js-task-duration" type="text" name="duration">
                    <span class="slider-label">h</span>
                    <div id="js-task-duration-slider"></div>
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
