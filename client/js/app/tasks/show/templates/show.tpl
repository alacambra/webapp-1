<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', path('home')) %></li>
    <% if (project) { %>
        <li><%= link_to('main_navi.projects', path('projects', 'list')) %></li>
        <li><%= link_to('task.label.project', path('projects', 'show', project.id)) %></li>
    <% } else { %>
        <li><%= link_to('main_navi.tasks', path('tasks', 'list')) %></li>
    <% } %>
    <li class="active"><%= title %></li>
</ol>

<div><%= textile(description) %></div>

<p><%= I18n.t('task.label.status') %>: <%= status_text(status) %></p>
<p><%= I18n.t('task.label.priority') %>: <%= priority_text(priority) %></p>
<p><%= I18n.t('task.label.start_date') %>: <%= format_date(startDate) %></p>
<p><%= I18n.t('task.label.end_date') %>: <%= format_date(endDate) %></p>
<p><%= I18n.t('task.label.duration') %>: <%= format_duration(duration) %></p>
<p>
    <%= I18n.t('task.label.effort') %>:
    <% if (effort != 0) { %>
        <%= link_to(format_duration(effort), path('efforts', 'list', id), { i18n: false }) %>
    <% } else { %>
        0:00
    <% } %>
</p>
<p><%= I18n.t('task.label.progress') %>: <%= format_progress(progress) %> %</p>

<div class="row">
    <div class="col-lg-4">
        <div class="progress">
            <div class="progress-bar" role="progressbar"
                 aria-valuenow="<%= format_progress(progress) %>" aria-valuemin="0" aria-valuemax="100"
                 style="width: <%= format_progress(progress) %>%;">
             </div>
        </div>
    </div>
</div>



<p>
    <%= I18n.t('task.label.project') %>:
    <% if (project) { %>
        <%= link_to(project.title, path('projects', 'show', project.id), { i18n: false }) %>
    <% } %>
</p>
<p>
    <%= I18n.t('task.label.parent_task') %>:
    <% if (parentTask) { %>
        <%= link_to(parentTask.title, path('tasks', 'show', parentTask.id), { i18n: false }) %>
    <% } %>
</p>
<p>
    <%= I18n.t('task.label.assigned_to') %>:
    <% if (assignee) { %>
        <%= link_to(full_name(assignee.firstName, assignee.lastName), path('users', 'show', assignee.id), { i18n: false }) %>
    <% } %>
</p>

<%= button_to('effort.button.new', path('efforts', 'create', id), { icon: 'time', class: 'right-space' }) %>
<%= button_to('edit', path('tasks', 'edit', id), { icon: 'pencil', class: 'right-space' }) %>

<button type="button" class="btn btn-default btn-sm btn-text js-delete-task">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>

<div id="js-subtasks"></div>
