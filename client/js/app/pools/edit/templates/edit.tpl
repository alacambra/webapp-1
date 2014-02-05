<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <li><%= link_to('main_navi.pools', path('pools', 'list')) %></li>
    <% if (!is_new_action()) {  %>
        <li><%= link_to(name, path('pools', 'show', id), { i18n: false }) %></li>
    <% } %>
    <li class="active"><%= I18n.t(is_new_action() ? 'new' : 'edit') %></li>
</ol>

<form>
    <fieldset>
        <div class="row">
            <div class="col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="control-label" for="js-pool-name"><%= I18n.t('pool.label.name') %></label>
                    <input id="js-pool-name" type="text" name="name" value="<%= name %>" class="form-control" maxlength="40">
                </div>

                <div class="form-group">
                    <label class="control-label" for="js-pool-description"><%= I18n.t('pool.label.description') %></label>
                    <textarea id="js-pool-description" name="description" class="form-control resize-vertical" rows="4" maxlength="1500"><%= description %></textarea>
                </div>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="row">
                    <div class="col-md-7 col-lg-8">
                        <div class="form-group">
                            <label class="control-label" for="js-pool-street"><%= I18n.t('pool.label.street') %></label>
                            <input id="js-pool-street" type="text" name="street" value="<%= street %>" class="form-control">
                        </div>
                    </div>

                    <div class="col-md-5 col-lg-4">
                        <div class="form-group">
                            <label class="control-label" for="js-pool-house-number"><%= I18n.t('pool.label.house_number') %></label>
                            <input id="js-pool-house-number" type="text" name="houseNumber" value="<%= houseNumber %>" class="form-control">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-4 col-lg-4">
                        <div class="form-group">
                            <label class="control-label" for="js-pool-zip"><%= I18n.t('pool.label.zip') %></label>
                            <input id="js-pool-zip" type="text" name="zip" value="<%= zip %>" class="form-control">
                        </div>
                    </div>

                    <div class="col-md-8 col-lg-8">
                        <div class="form-group">
                            <label class="control-label" for="js-pool-city"><%= I18n.t('pool.label.city') %></label>
                            <input id="js-pool-city" type="text" name="city" value="<%= city %>" class="form-control">
                        </div>
                    </div>
                </div>


                <div class="form-group">
                    <label class="control-label"><%= I18n.t('pool.label.country') %></label>
                    <%= select_for('pool', 'country', { class: 'form-control', selected: country }) %>
                </div>
            </div>

            <div class="col-sm-6 col-md-4 col-lg-4">
                <div class="form-group">
                    <label class="control-label" for="js-pool-email"><%= I18n.t('pool.label.email') %></label>
                    <input id="js-pool-email" type="text" name="email" value="<%= email %>" class="form-control">
                </div>

                <div class="form-group">
                    <label class="control-label" for="js-pool-website"><%= I18n.t('pool.label.website') %></label>
                    <input id="js-pool-website" type="text" name="website" value="<%= website %>" placeholder="http://www.ion2s.com" class="form-control">
                </div>

                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="control-label" for="js-pool-phone"><%= I18n.t('pool.label.phone') %></label>
                            <input id="js-pool-phone" type="text" name="phone" value="<%= phone %>" placeholder="+49 6151 39115-0" class="form-control">
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="control-label" for="js-pool-fax"><%= I18n.t('pool.label.fax') %></label>
                            <input id="js-pool-fax" type="text" name="fax" value="<%= fax %>" placeholder="+49 6151 39115-22" class="form-control">
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="control-label" for="js-pool-founding-date"><%= I18n.t('pool.label.founding_date') %></label>
                            <input id="js-pool-founding-date" type="text" name="foundingDate" value="<%= format_date(foundingDate) %>" placeholder="<%= format_date(1009839600) %>" class="form-control">
                        </div>
                    </div>

                    <div class="col-md-6 col-lg-6">
                        <div class="form-group">
                            <label class="control-label"><%= I18n.t('pool.label.employee_count') %></label>
                            <%= select_for('pool', 'employeeCount', { class: 'form-control', selected: employeeCount }) %>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-12">
                <button id="js-pool-submit" class="btn btn-default btn-sm btn-text right-space js-submit">
                    <span class="glyphicon glyphicon-floppy-disk"></span> <%= I18n.t('save') %>
                </button>

                <span id="js-pool-submit-error-msg" class="text-danger" style="display: none"></span>

                <img id="js-pool-save-indicator" src="img/load_indicator.gif" style="display: none;">
            </div>
        </div>
    </fieldset>
</form>
