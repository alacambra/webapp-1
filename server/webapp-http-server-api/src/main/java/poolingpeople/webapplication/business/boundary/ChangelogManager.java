package poolingpeople.webapplication.business.boundary;

import javax.enterprise.event.Observes;
import javax.inject.Inject;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.ChangeLogAttributeUpdate;
import poolingpeople.commons.entities.EntityFactory;
import poolingpeople.commons.entities.Subject;
import poolingpeople.commons.entities.Task;
import poolingpeople.persistence.neo4j.entities.AbstractPersistedModel;
import poolingpeople.persistence.neo4j.entities.PersistedChangeLog;
import poolingpeople.webapplication.business.task.entity.TaskDTO;

public class ChangelogManager {

	@Inject
	private EntityFactory entityFactory;

	@Inject
	private ILoggedUserContainer loggedUserContainer;

	public void onPersistedTaskUpdateChange(@Observes UpdateTask updateTaskEventModel) {
		createChangeLog(updateTaskEventModel.getOldTask(), updateTaskEventModel.getUpdatedTask());
	}

	@SuppressWarnings("unchecked")
	private void createChangeLog(final Task oldTask, final Task updatedTask) {

		if (!oldTask.getDescription().equals(updatedTask.getDescription())) {

			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("Description");
			changeLogAction.setOldValue(oldTask.getDescription());
			changeLogAction.setNewValue(updatedTask.getDescription());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());

		} else if (!oldTask.getDuration().equals(updatedTask.getDuration())) {
			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("Duration");
			changeLogAction.setOldValue(oldTask.getDuration().toString());
			changeLogAction.setNewValue(updatedTask.getDuration().toString());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());
		}

		else if (!oldTask.getEndDate().equals(updatedTask.getEndDate())) {
			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("EndDate");
			changeLogAction.setOldValue(oldTask.getEndDate().toString());
			changeLogAction.setNewValue(updatedTask.getEndDate().toString());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());
		}

		else if (!oldTask.getStartDate().equals(updatedTask.getStartDate())) {
			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("StartDate");
			changeLogAction.setOldValue(oldTask.getStartDate().toString());
			changeLogAction.setNewValue(updatedTask.getStartDate().toString());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());
		}

		else if (!oldTask.getStatus().equals(updatedTask.getStatus())) {
			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("Status");
			changeLogAction.setOldValue(oldTask.getStatus().name());
			changeLogAction.setNewValue(updatedTask.getStatus().name());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());
		} else if (!oldTask.getTitle().equals(updatedTask.getTitle())) {
			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("Title");
			changeLogAction.setOldValue(oldTask.getTitle());
			changeLogAction.setNewValue(updatedTask.getTitle());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());
		} else if (!oldTask.getPriority().equals(updatedTask.getPriority())) {
			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("Priority");
			changeLogAction.setOldValue(oldTask.getPriority().name());
			changeLogAction.setNewValue(updatedTask.getPriority().name());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());
		}

		else if (!oldTask.getProgress().equals(updatedTask.getProgress())) {
			ChangeLog changeLog = entityFactory.createChangeLog();
			ChangeLogAttributeUpdate changeLogAction = entityFactory
					.createChangeLogAttributeUpdate();
			changeLogAction
					.setChangeLogNode(((AbstractPersistedModel<PersistedChangeLog>) changeLog)
							.getNode());

			changeLogAction.setChangedAttributeName("Progress");
			changeLogAction.setOldValue(oldTask.getProgress().toString());
			changeLogAction.setNewValue(updatedTask.getProgress().toString());

			changeLog.load(changeLogAction, retrieveSubject(),
					System.currentTimeMillis());
		}
	}

	protected Subject retrieveSubject() {
		return loggedUserContainer.getUser();
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
