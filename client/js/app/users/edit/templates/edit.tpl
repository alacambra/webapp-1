<h2><%= I18n.t('user.header.' + (Backbone.history.location.hash.indexOf('new') > -1 ? 'new' : 'edit')) %></h2>

<form class="form-horizontal" role="form">
    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-firstName"><%= I18n.t('user.label.first_name') %></label>
            <input id="js-user-firstName" type="text" name="firstName" value="<%= firstName %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-lastName"><%= I18n.t('user.label.last_name') %></label>
            <input id="js-user-lastName" type="text" name="lastName" value="<%= lastName %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-birthDate"><%= I18n.t('user.label.birth_date') %></label>
            <input id="js-user-birthDate" type="text" name="birthDate" value="<%= format_date(birthDate) %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-email"><%= I18n.t('user.label.email') %></label>
            <input id="js-user-email" type="text" name="email" value="<%= email %>" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-password"><%= I18n.t('user.label.password') %></label>
            <input id="js-user-password" type="password" name="password" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-passwordConfirmation"><%= I18n.t('user.label.password_confirmation') %></label>
            <input id="js-user-passwordConfirmation" type="password" name="passwordConfirmation" class="form-control">
        </div>
    </div>

    <button id="js-user-submit" class="btn btn-default btn-sm btn-text right-space js-submit">
        <span class="glyphicon glyphicon-floppy-disk"></span> <%= I18n.t('save') %>
    </button>

    <span id="js-user-submit-error-msg" class="text-danger" style="display: none"></span>

    <img id="js-user-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>
