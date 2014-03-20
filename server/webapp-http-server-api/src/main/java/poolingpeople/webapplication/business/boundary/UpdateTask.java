package poolingpeople.webapplication.business.boundary;

import poolingpeople.commons.entities.Task;
import poolingpeople.webapplication.business.task.entity.TaskDTO;

public class UpdateTask {

	private Task updatedTask;
	private TaskDTO oldTask;

	public UpdateTask(TaskDTO oldTask, Task task) {
		this.oldTask = oldTask;
		this.updatedTask = task;
	}

	public Task getUpdatedTask() {
		return updatedTask;
	}

	public TaskDTO getOldTask() {
		return oldTask;
	}
	
}
