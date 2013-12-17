<h2><%= title %></h2>
<p>Description:</p>
<p><%= description %></p>
<br />
<p>Status: <%= status_text(status) %></p>
<p>Priority: <%= priority_text(priority) %>&nbsp;</p>
<p>Start: <%= format_date(startDate) %>&nbsp;</p>
<p>End: <%= format_date(endDate) %>&nbsp;</p>
<p>Duration: <%= format_duration(duration) %>&nbsp;</p>
<p>Progress: <%= format_progress(progress) %>&nbsp;</p>

<a href="#tasks/<%= id %>/edit" class="btn btn-default btn-sm js-edit" style="margin-right: 10px">
    <span class="glyphicon glyphicon-pencil" style="margin-right: 5px"></span> Edit
</a>
<button type="button" class="btn btn-default btn-sm js-delete">
    <span class="glyphicon glyphicon-trash" style="margin-right: 5px"></span> Delete
</button>