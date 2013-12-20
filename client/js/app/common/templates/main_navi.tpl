<div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <a href="/"><img id="navi-logo" src="img/poolingpeople_logo.png"></a>
        </div>

        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
                <li><a href="#">Pools</a></li>
                <li><a href="#">People</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Messages</a></li>
                <li><a href="#">Projects</a></li>
                <li class="active"><a href="#tasks">Tasks</a></li>
                <li><a href="#">Calendar</a></li>
            </ul>

            <form class="navbar-form navbar-left" role="search">
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Search">
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
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
                <li><a href="#">Logout</a></li>
            </ul>
        </div>
    </div>
</div>