<h2>Edit Task <%= title %></h2>
<form role="form" class="form-horizontal">
    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-title" type="text" name="title" value="<%= title %>" placeholder="Title" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <textarea id="js-task-description" name="description" placeholder="Description" class="form-control"><%= description %></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <select id="js-task-status" name="status" class="form-control">
                <option value="0" <%= status == 0 ? 'selected' : '' %>>- Status -</option>
                <option value="1" <%= status == 1 ? 'selected' : '' %>>ToDo</option>
                <option value="2" <%= status == 2 ? 'selected' : '' %>>New</option>
                <option value="3" <%= status == 3 ? 'selected' : '' %>>Assigned</option>
                <option value="4" <%= status == 4 ? 'selected' : '' %>>On hold</option>
                <option value="5" <%= status == 5 ? 'selected' : '' %>>Completed</option>
                <option value="6" <%= status == 6 ? 'selected' : '' %>>Archieved</option>
                <option value="7" <%= status == 7 ? 'selected' : '' %>>Requested</option>
                <option value="8" <%= status == 8 ? 'selected' : '' %>>Offered</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <select id="js-task-priority" name="priority" class="form-control">
                <option value="0" <%= priority == 0 ? 'selected' : '' %>>- Priority -</option>
                <option value="1" <%= priority == 1 ? 'selected' : '' %>>Low</option>
                <option value="2" <%= priority == 2 ? 'selected' : '' %>>Normal</option>
                <option value="3" <%= priority == 3 ? 'selected="true"' : '' %>>High</option>
            </select>
       </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-startDate" type="text" name="startDate" value="<%= format_date(startDate) %>" placeholder="Start date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-endDate" type="text" name="endDate" value="<%= format_date(endDate) %>" placeholder="End date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-duration" type="text" name="duration" value="<%= format_duration(duration) %>" placeholder="Duration" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="js-task-progress" type="text" class="form-control" name="progress" value="<%= format_progress(progress) %>" placeholder="Progress" class="form-control">
        </div>
    </div>

    <button class="btn btn-default btn-sm js-submit" style="margin-right: 10px">
        <span class="glyphicon glyphicon-floppy-disk" style="margin-right: 5px"></span> Save
    </button>

    <img id="js-task-save-inidcator" src="img/load_indicator.gif" style="display: none;">
</form>

