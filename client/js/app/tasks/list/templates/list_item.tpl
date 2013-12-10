<div class="col-md-3"><%= title %></div>
<div class="col-md-2"><%= description %>&nbsp;</div>
<div class="col-md-1"><%= status_text(status) %>&nbsp;</div>
<div class="col-md-1"><%= priority_text(priority) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(start) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(end) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(duration) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_progress(progress) %>&nbsp;</div>
<div class="col-md-1 buttons">
    <button type="button" class="btn btn-default btn-xs js-edit">
        <span class="glyphicon glyphicon-pencil"></span>
    </button>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
