<div class="col-md-3 js-title"><a href="#tasks/<%= id %>"><%= title %></a></div>
<div class="col-md-2"><%= short_text(description, 20) %>&nbsp;</div>
<div class="col-md-1"><%= status_text(status) %>&nbsp;</div>
<div class="col-md-1"><%= priority_text(priority) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(startDate) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(endDate) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(duration) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_progress(progress) %>&nbsp;</div>
<div class="col-md-1 buttons">
    <a href="#tasks/<%= id %>/edit" class="btn btn-default btn-xs js-edit">
        <span class="glyphicon glyphicon-pencil"></span>
    </a>
    <button type="button" class="btn btn-default btn-xs js-delete">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
