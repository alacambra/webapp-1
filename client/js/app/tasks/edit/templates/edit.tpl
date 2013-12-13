<h2>Edit Task <%= title %></h2>
<form role="form" class="form-horizontal">
    <div class="form-group">
        <div class="col-lg-3">
            <input id="task-title" type="text" name="title" value="<%= title %>" placeholder="Title" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <textarea id="task-description" name="description" placeholder="Description" class="form-control"><%= description %></textarea>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <select id="task-status" name="status" class="form-control">
                <option value="">- Status -</option>
                <option value="0" <%= status == 0 ? 'selected' : '' %>>ToDo</option>
                <option value="1" <%= status == 1 ? 'selected' : '' %>>New</option>
                <option value="2" <%= status == 2 ? 'selected' : '' %>>Assigned</option>
                <option value="3" <%= status == 3 ? 'selected' : '' %>>On hold</option>
                <option value="4" <%= status == 4 ? 'selected' : '' %>>Completed</option>
                <option value="5" <%= status == 5 ? 'selected' : '' %>>Archieved</option>
                <option value="6" <%= status == 6 ? 'selected' : '' %>>Requested</option>
                <option value="7" <%= status == 7 ? 'selected' : '' %>>Offered</option>
            </select>
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <select id="task-priority" name="priority" class="form-control">
                <option value="">- Priority -</option>
                <option value="0" <%= priority == 0 ? 'selected' : '' %>>Low</option>
                <option value="1" <%= priority == 1 ? 'selected' : '' %>>Normal</option>
                <option value="2" <%= priority == 2 ? 'selected="true"' : '' %>>High</option>
            </select>
       </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="task-startDate" type="text" name="startDate" value="<%= startDate %>" placeholder="Start date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="task-endDate" type="text" name="endDate" value="<%= endDate %>" placeholder="End date" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="task-duration" type="text" name="duration" value="<%= duration %>" placeholder="Duration" class="form-control">
        </div>
    </div>

    <div class="form-group">
        <div class="col-lg-3">
            <input id="task-progress" type="text" class="form-control" name="progress" value="<%= progress %>" placeholder="Progress" class="form-control">
        </div>
    </div>

    <button class="btn btn-sm js-submit" style="margin-right: 10px">
        <span class="glyphicon glyphicon-floppy-disk" style="margin-right: 5px"></span> Save
    </button>

    <img id="js-task-save-inidcator" src="img/load_indicator.gif" style="display: none;">
</form>

