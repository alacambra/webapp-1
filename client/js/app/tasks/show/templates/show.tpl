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
