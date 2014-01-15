<ol class="breadcrumb">
    <li><a class="js-home" href="<%= url_for('') %>"><%= I18n.t('main_navi.home') %></a></li>
    <li><a class="js-tasks" href="<%= url_for('tasks') %>"><%= I18n.t('main_navi.tasks') %></a></li>
    <li><a class="js-task" href="<%= url_for('tasks', task_id) %>"><%= I18n.t('main_navi.task') %></a></li>
    <li><a class="js-efforts" href="<%= url_for('tasks', task_id, 'efforts') %>"><%= I18n.t('main_navi.efforts') %></a></li>
    <% if (Backbone.history.location.hash.indexOf('new') < 0) { %>
    <li><a class="js-effort" href="<%= url_for('efforts', id) %>"><%= I18n.t('main_navi.effort') %></a></li>
    <% } %>
    <li class="active"><%= I18n.t(Backbone.history.location.hash.indexOf('new') > -1 ? 'new' : 'edit') %></li>
</ol>

<form class="form-horizontal" role="form">
    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-effort-date"><%= I18n.t('effort.label.date') %></label>
            <input id="js-effort-date" type="text" name="date" value="<%= format_date(date) %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4 effort-slider-group">
            <label class="control-label" for="js-effort-time"><%= I18n.t('effort.label.time') %></label>
            <input id="js-effort-time" type="text" name="time">
            <span>h</span>
            <div id="js-effort-time-slider"></div>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-effort-comment"><%= I18n.t('effort.label.comment') %></label>
            <input id="js-effort-comment" type="text" name="comment" value="<%= comment %>" class="form-control">
        </div>
    </div>

    <button id="js-effort-submit" class="btn btn-default btn-sm btn-text right-space js-submit">
        <span class="glyphicon glyphicon-floppy-disk"></span> <%= I18n.t('save') %>
    </button>

    <span id="js-effort-submit-error-msg" class="text-danger" style="display: none"></span>

    <img id="js-effort-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>
