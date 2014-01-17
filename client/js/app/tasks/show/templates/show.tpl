<ol class="breadcrumb">
    <li><%= link_to('main_navi.home', home_path()) %></li>
    <li><%= link_to('main_navi.tasks', tasks_path()) %></li>
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
        <%= link_to(format_duration(effort), efforts_path(id), { i18n: false }) %>
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

<%= button_to('effort.button.new', new_effort_path(id), { icon: 'time', class: 'right-space' }) %>
<%= button_to('edit', edit_task_path(id), { icon: 'pencil', class: 'right-space' }) %>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>