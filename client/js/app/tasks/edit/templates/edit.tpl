<h2><%= Backbone.history.location.hash.match(/new/) ? 'New' : 'Edit' %> Task <%= title %></h2>
<form role="form" class="form-horizontal">
    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-title" type="text" name="title" value="<%= title %>" placeholder="Title" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <textarea id="js-task-description" name="description" placeholder="Description" class="form-control" maxlength="5000"><%= description %></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <%= select_for('task', 'status', { class: 'form-control', selected: status }) %>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <%= select_for('task', 'priority', { class: 'form-control', selected: priority }) %>
       </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-startDate" type="date" name="startDate" value="<%= format_date(startDate) %>" placeholder="Start date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-endDate" type="date" name="endDate" value="<%= format_date(endDate) %>" placeholder="End date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-duration" type="text" name="duration" value="<%= format_duration(duration) %>" placeholder="Estimated Duration" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-progress" type="number" class="form-control" name="progress" value="<%= format_progress(progress) %>" min="0" max="100" class="form-control">
        </div>
    </div>

    <button class="btn btn-default btn-sm js-submit" style="margin-right: 10px">
        <span class="glyphicon glyphicon-floppy-disk" style="margin-right: 5px"></span> Save
    </button>

    <img id="js-task-save-indicator" src="img/load_indicator.gif" style="display: none;">
</form>

