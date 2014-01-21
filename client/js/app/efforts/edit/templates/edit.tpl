<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.tasks', path('tasks', 'list')) %></li>
    <li><%= link_to('main_navi.task', path('tasks', 'show', task_id)) %></li>
    <li><%= link_to('main_navi.efforts', path('efforts', 'list', task_id)) %></li>
    <% if (!is_new_action()) {  %>
        <li><%= link_to('main_navi.effort', path('efforts', 'show', task_id, id)) %></li>
    <% } %>
    <li class="active"><%= I18n.t(is_new_action() ? 'new' : 'edit') %></li>
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
