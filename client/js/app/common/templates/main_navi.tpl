<div class="navbar navbar-default navbar-static-top navbar-inverse" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <!-- pooling people logo -->
            <a href="#" data-navigate="home"><img id="navi-logo" height="40px" width="40px" src="img/pp_logo.png"></a>
        </div>

        <div class="collapse navbar-collapse">
            <!-- main navi -->
            <ul id="js-main-navi-items" class="nav navbar-nav">
                <li><%= link_to('main_navi.pools', path('pools', 'list')) %></li>
                <li><%= link_to('main_navi.people', path('users', 'list')) %></li>
                <li><%= link_to('main_navi.services', path('services', 'list')) %></li>
                <li><a href="#"><%= I18n.t('main_navi.messages') %></a></li>
                <li><%= link_to('main_navi.projects', path('projects', 'list')) %></li>
                <li><%= link_to('main_navi.tasks', path('tasks', 'list')) %></li>
                <li><a href="#"><%= I18n.t('main_navi.calendar') %></a></li>
            </ul>

            <!-- search box and button -->
            <form class="navbar-form navbar-left visible-lg" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="<%= I18n.t('main_navi.search_placeholder') %>">
                </div>
                <button type="submit" class="btn btn-default" title="<%= I18n.t('main_navi.search_button_title') %>">
                    <span class="glyphicon glyphicon-search"></span>
                </button>
            </form>

            <!-- language selector -->
            <div class="navbar-form navbar-left visible-md visible-lg">
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

            <!-- admin options -->
            <!--
            <div class="navbar-form navbar-left">
                <div class="btn-group">
                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                        <span class="glyphicon glyphicon-wrench"></span>
                    </button>
                    <ul class="dropdown-menu" role="menu" id="js-admin-options">
                        <li><a href="">test</a></li>
                    </ul>
                </div>
            </div>
            -->

            <!-- login/logout button -->
            <ul class="nav navbar-nav navbar-right visible-md visible-lg">
                <li>
                    <% if (!logged_in) { %>
                        <a id="login_button" href="#login"><%= I18n.t('main_navi.login') %></a>
                    <% } else { %>
                        <a id="logout_button" href="#logout" title="<%= current_username %>"><%= I18n.t('main_navi.logout') %></a>
                    <% } %>
                </li>
            </ul>
        </div>
    </div>
</div>