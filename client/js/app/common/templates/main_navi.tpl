<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a href="/"><img id="navi-logo" src="img/poolingpeople_logo.png"></a>
        </div>

        <div class="collapse navbar-collapse">
            <ul id="js-main-navi-items" class="nav navbar-nav">
                <li><a href="#"><%= I18n.t('main_navi.pools') %></a></li>
                <li><a href="#"><%= I18n.t('main_navi.people') %></a></li>
                <li><a href="#"><%= I18n.t('main_navi.services') %></a></li>
                <li><a href="#"><%= I18n.t('main_navi.messages') %></a></li>
                <li><a href="#"><%= I18n.t('main_navi.projects') %></a></li>
                <li><a href="<%= url_for('tasks') %>"><%= I18n.t('main_navi.tasks') %></a></li>
                <li><a href="#"><%= I18n.t('main_navi.calendar') %></a></li>
            </ul>

            <form class="navbar-form navbar-left" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="<%= I18n.t('main_navi.search_placeholder') %>">
                </div>
                <button type="submit" class="btn btn-default"><%= I18n.t('main_navi.search_button') %></button>
            </form>

            <div class="navbar-form navbar-left">
                <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        <%= I18n.locale.toUpperCase() %> <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" id="js-locale">
                        <% _.each(available_locales, function(locale) { %>
                            <li><a href="#<%= locale %>"><%= I18n.t('locale.' + locale) %></a></li>
                        <% }) %>
                    </ul>
                </div>
            </div>

            <ul class="nav navbar-nav navbar-right">
                <li><a href="#"><%= I18n.t('main_navi.logout') %></a></li>
            </ul>
        </div>
    </div>
</div>