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

            <!-- language selector -->
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><%= I18n.locale.toUpperCase() %> <b class="caret"></b></a>
                    <ul id="js-locale" class="dropdown-menu">
                        <% _.each(available_locales, function(locale) { %>
                        <li><a href="#<%= locale %>"><%= I18n.t('locale.' + locale) %></a></li>
                        <% }) %>
                    </ul>
                </li>
            </ul>

            <!-- admin options -->
            <!--
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a href="" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-wrench"></span></a>
                    <ul id="js-admin-options" class="dropdown-menu">
                        <li><a href="">test</a></li>
                    </ul>
                </li>
            </ul>
            -->
        </div>
    </div>
</div>