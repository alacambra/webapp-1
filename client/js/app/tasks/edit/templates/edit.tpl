<h2><%= I18n.t('task.' + (Backbone.history.location.hash.indexOf('new') > -1 ? 'new' : 'edit')) %></h2>

<form role="form" class="form-horizontal">
    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-title"><%= I18n.t('task.label.title') %></label>
            <input id="js-task-title" type="text" name="title" value="<%= title %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-description"><%= I18n.t('task.label.description') %></label>
            <textarea id="js-task-description" name="description" class="form-control" rows="4" maxlength="5000"><%= description %></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label><%= I18n.t('task.label.status') %></label>
            <%= select_for('task', 'status', { class: 'form-control', selected: status }) %>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label><%= I18n.t('task.label.priority') %></label>
            <%= select_for('task', 'priority', { class: 'form-control', selected: priority }) %>
       </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-startDate"><%= I18n.t('task.label.start_date') %></label>
            <input id="js-task-startDate" type="text" name="startDate" value="<%= format_date(startDate) %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-endDate"><%= I18n.t('task.label.end_date') %></label>
            <input id="js-task-endDate" type="text" name="endDate" value="<%= format_date(endDate) %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4 task-slider-group">
            <label for="js-task-duration"><%= I18n.t('task.label.duration') %></label>
            <input id="js-task-duration" type="text" name="duration">
            <span>h</span>
            <div id="js-task-duration-slider"></div>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4 task-slider-group">
            <label for="js-task-progress"><%= I18n.t('task.label.progress') %></label>
            <input id="js-task-progress" type="text" name="progress">
            <span>%</span>
            <div id="js-task-progress-slider"></div>
        </div>
    </div>

    <button class="btn btn-default btn-sm btn-text right-space js-submit">
        <span class="glyphicon glyphicon-floppy-disk"></span> <%= I18n.t('save') %>
    </button>

    <img id="js-task-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>

