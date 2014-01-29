package poolingpeople.webapplication.business.task.boundary;

import java.util.Collection;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;

import poolingpeople.webapplication.business.boundary.RootApplicationException;
import poolingpeople.webapplication.business.entity.IgnoreAttribute;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.task.entity.TaskPriority;
import poolingpeople.webapplication.business.task.entity.TaskStatus;
import poolingpeople.webapplication.business.user.entity.User;

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
	@Override
	public String getId() {
		return id;
	}

	@Override
	public String getTitle() {
		return title;
	}

	@Override
	public String getDescription() {
		return description;
	}

	@IgnoreAttribute
	@Override
	public TaskPriority getPriority() {
		return null;
	}

	@IgnoreAttribute
	@Override
	public TaskStatus getStatus() {
		return null;
	}

	@Override
	public Long getStartDate() {
		return startDate;
	}

	@Override
	public Long getEndDate() {
		return endDate;
	}

	@Override
	public Float getProgress() {
		return progress;
	}

	public void setId(String id) {
		this.id = id;
	}

	@Override
	public void setTitle(String title) {
		this.title = title;
	}

	@Override
	public void setDescription(String description) {
		this.description = description;
	}

	@IgnoreAttribute
	@JsonIgnore
	@Override
	public void setPriority(TaskPriority priority) {
	}

	@IgnoreAttribute
	@Override
	public void setStatus(TaskStatus status) {
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
	public void setDefaultDuration(Integer duration) {
		this.duration = duration;
	}

	@Override
	@JsonIgnore
	public void addEffort(Effort effort) {
		throw new RootApplicationException("Inaccessible method");
		
	}

	@Override
	@JsonIgnore
	public Collection<Effort> getEfforts() {
		throw new RootApplicationException("Inaccessible method");
	}

	@Override
	public void deleteEffort(Effort effort) {
		throw new RootApplicationException("Inaccessible method");		
	}

	@Override
	public Integer getEffort() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Project getProject() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setDefaultStartDate(Long startDate) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setDefaultEndDate(Long endDate) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setDefaultProgress(Float progress) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateProgress() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateDates() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateDuration() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateEfforts() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addSubtask(Task child) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeSubtask(Task child) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeTaskRelation(Task child) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setAssignee(User u) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Task getParent() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User getAssignee() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getParentId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Task> getSubtasks() {
		// TODO Auto-generated method stub
		return null;
	}


}
