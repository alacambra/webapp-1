<h2><%= title %></h2>
<p>Description:</p>
<p><%= description %></p>
<br />
<p>Status: <%= status_text(status) %></p>
<p>Priority: <%= priority_text(priority) %></p>
<p>Start: <%= format_date(startDate) %></p>
<p>End: <%= format_date(endDate) %></p>
<p>Estimated Duration: <%= format_duration(duration) %></p>
<p>Progress: <%= format_progress(progress) %> %</p>

<a href="#tasks/<%= id %>/edit" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> Edit
</a>
<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> Delete
</button>