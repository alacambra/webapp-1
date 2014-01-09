<h2><%= I18n.t('effort.header.' + (Backbone.history.location.hash.indexOf('new') > -1 ? 'new' : 'edit')) %></h2>

<form class="form-horizontal" role="form">
    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-effort-date"><%= I18n.t('effort.label.date') %></label>
            <input id="js-effort-date" type="text" name="date" value="<%= format_date(date) %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-effort-time"><%= I18n.t('effort.label.time') %></label>
            <input id="js-effort-time" type="text" name="time" value="<%= time %>" class="form-control">
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
