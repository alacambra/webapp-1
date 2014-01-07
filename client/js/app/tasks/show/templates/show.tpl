<h2><%= title %></h2>

<div><%= textile(description) %></div>

<p><%= I18n.t('task.label.status') %>: <%= status_text(status) %></p>
<p><%= I18n.t('task.label.priority') %>: <%= priority_text(priority) %></p>
<p><%= I18n.t('task.label.start_date') %>: <%= format_date(startDate) %></p>
<p><%= I18n.t('task.label.end_date') %>: <%= format_date(endDate) %></p>
<p><%= I18n.t('task.label.duration') %>: <%= format_duration(duration) %></p>
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

<a href="<%= url_for('tasks', 'edit', id) %>" class="btn btn-default btn-sm btn-text right-space js-edit">
    <span class="glyphicon glyphicon-pencil"></span> <%= I18n.t('edit') %>
</a>

<button type="button" class="btn btn-default btn-sm btn-text js-delete">
    <span class="glyphicon glyphicon-trash"></span> <%= I18n.t('delete') %>
</button>