package poolingpeople.webapplication.business.boundary;

import org.codehaus.jackson.map.annotate.JsonView;
import poolingpeople.webapplication.business.entity.ITask;
import poolingpeople.webapplication.business.entity.TaskPriority;
import poolingpeople.webapplication.business.entity.TaskStatus;

public class TaskMixin implements ITask{

	@Override
	@JsonView(View.SampleView.class)
	public String getId() {
		return null;
	}

	@Override
	@JsonView(View.NoSend.class)
	public String getTitle() {
		return null;
	}

	@Override
	public void setTitle(String title) {
	}

	@Override
	public String getDescription() {
		return null;
	}

	@Override
	public void setDescription(String description) {
	}

	@Override
	public TaskPriority getPriority() {
		return null;
	}

	@Override
	public void setPriority(TaskPriority priority) {
	}

	@Override
	public TaskStatus getStatus() {
		return null;
	}

	@Override
	public void setStatus(TaskStatus status) {
	}

	@Override
	public Long getStartDate() {
		return null;
	}

	@Override
	public void setStartDate(Long startDate) {
	}

	@Override
	public Long getEndDate() {
		return null;
	}

	@Override
	public void setEndDate(Long endDate) {

	}

	@Override
	public Integer getProgress() {
		return null;
	}

	@Override
	public void setProgress(int progress) {
	}
}
