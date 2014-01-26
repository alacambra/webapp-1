package poolingpeople.webapplication.business.project.boundary;

import java.util.Collection;

import org.codehaus.jackson.annotate.JsonProperty;

import poolingpeople.webapplication.business.entity.IgnoreAttribute;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.project.entity.ProjectStatus;
import poolingpeople.webapplication.business.task.entity.Task;

public class ProjectDTO implements Project {

	private String id;
	private String title;
	private String description;
	private int status;
	private Long startDate;
	private Long endDate;
	private Float progress;

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
	public ProjectStatus getStatus() {
		return null;
	}

	@Override
	public Long getStartDate() {
		return startDate;
	}
	
	public Long getDefaultStartDate() {
		return startDate;
	}

	@Override
	public Long getEndDate() {
		return endDate;
	}
	
	public Long getDefaultEndDate() {
		return endDate;
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
	@Override
	public void setStatus(ProjectStatus status) {
	}

	@Override
	public void setDefaultStartDate(Long startDate) {
		this.startDate = startDate;
	}

	@Override
	public void setDefaultEndDate(Long endDate) {
		this.endDate = endDate;
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
	public Collection<Task> getTasks() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeTask(Task task) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addTask(Task task) {
		
	}

	@Override
	public Integer getEffort() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void updateEffort() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateProgress() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Float getProgress() {
		// TODO Auto-generated method stub
		return progress;
	}
	
	@Override
	public void setDefaultProgress(Float progress) {
		// TODO Auto-generated method stub
 		this.progress = progress;
	}
	
	public Float getDefaultProgress() {
		// TODO Auto-generated method stub
 		return progress;
	}


	@Override
	public void updateDates() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateAll() {
		// TODO Auto-generated method stub
		
	}
}







































