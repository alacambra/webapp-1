<div class="col-md-2">
    <%= link_to(truncate(title, 25), path('tasks', 'show', id), { i18n: false }) %>
    <span title="<%= I18n.t('task.label.subtask') %>"><%= subtaskCount > 0 ? '[' + subtaskCount + ']' : '' %></span>
</div>

<div class="col-md-1">
    <% if (parent !== 'project') { %>
        <% if (project) { %>
            <%= link_to(project.title, path('projects', 'show', project.id), { i18n: false }) %>
        <% } %>
    <% } else { %>
        <%= truncate(description, 25) %>&nbsp;
    <% } %>
</div>

<div class="col-md-1">
    <% if (assignee) { %>
        <%= link_to(full_name(assignee.firstName, assignee.lastName), path('users', 'show', assignee.id), { i18n: false }) %>
    <% } %>
</div>

<div class="col-md-1"><%= status_text(status) %>&nbsp;</div>
<div class="col-md-1"><%= priority_text(priority) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(startDate) %>&nbsp;</div>
<div class="col-md-1"><%= format_date(endDate) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(duration) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_duration(effort) %>&nbsp;</div>
<div class="col-md-1 right"><%= format_progress(progress) %> %&nbsp;</div>
<div class="col-md-1 buttons">
    <%= button_to('', path('tasks', 'edit', id), { icon: 'pencil', class: 'btn-xs' }) %>
    <button type="button" class="btn btn-default btn-xs js-delete-task">
        <span class="glyphicon glyphicon-trash"></span>
    </button>
</div>
