<h2><%= Backbone.history.location.hash.indexOf('new') > -1 ? 'New' : 'Edit' %> Task <%= title %></h2>
<form role="form" class="form-horizontal">
    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-title">Title</label>
            <input id="js-task-title" type="text" name="title" value="<%= title %>" placeholder="Title" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-description">Description</label>
            <textarea id="js-task-description" name="description" placeholder="Description" class="form-control" rows="4" maxlength="5000"><%= description %></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label>Status</label>
            <%= select_for('task', 'status', { class: 'form-control', selected: status }) %>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label>Priority</label>
            <%= select_for('task', 'priority', { class: 'form-control', selected: priority }) %>
       </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-startDate">Start Date</label>
            <input id="js-task-startDate" type="text" name="startDate" value="<%= format_date(startDate) %>" placeholder="Start date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4">
            <label for="js-task-endDate">End Date</label>
            <input id="js-task-endDate" type="text" name="endDate" value="<%= format_date(endDate) %>" placeholder="End date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4 task-slider-group">
            <label for="js-task-duration">Estimated Duration:</label>
            <input id="js-task-duration" type="text" name="duration">
            <span>h</span>
            <div id="js-task-duration-slider"></div>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-4 task-slider-group">
            <label for="js-task-progress">Progress:</label>
            <input id="js-task-progress" type="text" name="progress">
            <span>%</span>
            <div id="js-task-progress-slider"></div>
        </div>
    </div>

    <button class="btn btn-default btn-sm btn-text right-space js-submit">
        <span class="glyphicon glyphicon-floppy-disk"></span> Save
    </button>

    <img id="js-task-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>

