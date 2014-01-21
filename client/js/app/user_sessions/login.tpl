<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li class="active"><%= I18n.t('main_navi.login') %></li>
</ol>

<form class="form-horizontal" role="form">
    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-session-username"><%= I18n.t('user_session.label.username') %></label>
            <input id="js-user-session-username" type="text" name="username" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label class="control-label" for="js-user-session-password"><%= I18n.t('user_session.label.password') %></label>
            <input id="js-user-session-password" type="password" name="password" class="form-control">
        </div>
    </div>

    <button id="js-user-session-submit" class="btn btn-default btn-sm btn-text right-space js-submit">
        <span class="glyphicon glyphicon-send"></span> <%= I18n.t('user_session.button.login') %>
    </button>

    <span id="js-user-session-submit-error-msg" class="text-danger" style="display: none"></span>

    <img id="js-user-session-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>
