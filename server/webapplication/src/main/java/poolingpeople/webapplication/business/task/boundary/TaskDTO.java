package poolingpeople.webapplication.business.task.boundary;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonValue;

import poolingpeople.webapplication.business.entity.IgnoreAttribute;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.task.entity.TaskPriority;
import poolingpeople.webapplication.business.task.entity.TaskStatus;

public class TaskDTO implements Task {

	private String id;
	private String title;
	private String description;
	private int priority;
	private int status;
	private Long startDate;
	private Long endDate;
	private Float progress;
	private Integer duration;
	
	@IgnoreAttribute
	public String getId() {
		return id;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	@IgnoreAttribute
	public TaskPriority getPriority() {
		return null;
	}

	@IgnoreAttribute
	public TaskStatus getStatus() {
		return null;
	}

	public Long getStartDate() {
		return startDate;
	}

	public Long getEndDate() {
		return endDate;
	}

	public Float getProgress() {
		return progress;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@IgnoreAttribute
	@JsonIgnore
	public void setPriority(TaskPriority priority) {
	}

	@IgnoreAttribute
	public void setStatus(TaskStatus status) {
	}

	public void setStartDate(Long startDate) {
		this.startDate = startDate;
	}

	public void setEndDate(Long endDate) {
		this.endDate = endDate;
	}

	public void setProgress(Float progress) {
		this.progress = progress;
	}
	
	@Override
	@JsonProperty(value="priority")
	public Integer getPriorityInteger() {
		return priority;
	}
	
	@Override
	@JsonProperty(value="priority")
	public void setPriorityInteger(Integer priority) {
		this.priority = priority;
	}
	
	@Override
	@JsonProperty(value="status")
	public Integer getStatusInteger() {
		return status;
	}
	
	@Override
	public void setStatusInteger(Integer status) {
		this.status = status;
	}

	@Override
	public Integer getDuration() {
		return duration;
	}

	@Override
	public void setDuration(Integer duration) {
		this.duration = duration;
	}
	
	
}
