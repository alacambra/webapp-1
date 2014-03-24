package poolingpeople.webapplication.business.boundary;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.event.Observes;
import javax.enterprise.inject.Instance;
import javax.inject.Inject;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.ChangeLogAttributeUpdate;
import poolingpeople.commons.entities.EntityFactory;
import poolingpeople.commons.entities.Subject;
import poolingpeople.commons.entities.Task;
import poolingpeople.persistence.neo4j.entities.PersistedChangeLog;
import poolingpeople.persistence.neo4j.entities.PersistedChangeLogAttributeUpdateAction;
import poolingpeople.webapplication.business.task.entity.TaskDTO;

public class ChangelogManager {

	@Inject
	private EntityFactory entityFactory;

	@Inject
	private ILoggedUserContainer loggedUserContainer;

	/**
	 * TODO: should use a qualifier based on the ChangeLogActionType enum in order to reuse this event handler for other entities
	 */
	//wo wird die Beziehung zum Task gespeichert ?
	public void onPersistedTaskUpdateChange(@Observes UpdateTask updateTaskEventModel) {
		List<ChangeLogAttributeUpdate> changes = getChanges(updateTaskEventModel.getOldTask(), updateTaskEventModel.getUpdatedTask());

		for (ChangeLogAttributeUpdate changeLogUpdateAction : changes) {
			entityFactory.createChangeLog(changeLogUpdateAction, retrieveSubject(), System.currentTimeMillis());
		}
	}

	protected Subject retrieveSubject() {
		return loggedUserContainer.getUser();
	}

	private List<ChangeLogAttributeUpdate> getChanges(final Task oldTask,final Task updatedTask) {
		List<ChangeLogAttributeUpdate> changes = new ArrayList<>();
		
		if(! oldTask.getEffort().equals(updatedTask.getEffort()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("Effort");
					this.setOldValue(oldTask.getEffort().toString());
					this.setNewValue(updatedTask.getEffort().toString());
				}
			});
		
		else if(! oldTask.getDescription().equals(updatedTask.getDescription()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("Description");
					this.setOldValue(oldTask.getDescription().toString());
					this.setNewValue(updatedTask.getDescription().toString());
				}
			});
		
		else if(! oldTask.getDuration().equals(updatedTask.getDuration()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("Duration");
					this.setOldValue(oldTask.getDuration().toString());
					this.setNewValue(updatedTask.getDuration().toString());
				}
			});
		
		else if(! oldTask.getEndDate().equals(updatedTask.getEndDate()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("EndDate");
					this.setOldValue(oldTask.getEndDate().toString());
					this.setNewValue(updatedTask.getEndDate().toString());
				}
			});
		
		else if(! oldTask.getStartDate().equals(updatedTask.getStartDate()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("StartDate");
					this.setOldValue(oldTask.getStartDate().toString());
					this.setNewValue(updatedTask.getStartDate().toString());
				}
			});
		
		else if(! oldTask.getStatus().equals(updatedTask.getStatus()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("Status");
					this.setOldValue(oldTask.getStatus().toString());
					this.setNewValue(updatedTask.getStatus().toString());
				}
			});
		
		else if(! oldTask.getTitle().equals(updatedTask.getTitle()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("Title");
					this.setOldValue(oldTask.getTitle().toString());
					this.setNewValue(updatedTask.getTitle().toString());
				}
			});
		
		else if(! oldTask.getPriority().equals(updatedTask.getPriority()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("Priority");
					this.setOldValue(oldTask.getPriority().toString());
					this.setNewValue(updatedTask.getPriority().toString());
				}
			});
		else if(! oldTask.getProgress().equals(updatedTask.getProgress()))
			changes.add(new PersistedChangeLogAttributeUpdateAction() {
				{
					this.setChangedAttributeName("Progress");
					this.setOldValue(oldTask.getProgress().toString());
					this.setNewValue(updatedTask.getProgress().toString());
				}
			});
		
		return changes;
	}

	public static Task deepCopyOfPersistedTask(final Task task) {
		return new TaskDTO() {
			{
				setTitle(task.getTitle());
				setStatus(task.getStatus());
				setPriority(task.getPriority());
				setId(task.getId());
				setDescription(task.getDescription());
				setDefaultStartDate(task.getStartDate());
				setDefaultProgress(task.getProgress());
				setDefaultEndDate(task.getEndDate());
				setDefaultDuration(task.getDuration());
				setAssignee(task.getAssignee());
			}
		};
	}
}
