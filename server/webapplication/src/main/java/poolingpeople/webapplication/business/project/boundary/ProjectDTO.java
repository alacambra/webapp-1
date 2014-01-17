package poolingpeople.webapplication.business.project.boundary;

import org.codehaus.jackson.annotate.JsonProperty;
import poolingpeople.webapplication.business.entity.IgnoreAttribute;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.project.entity.ProjectStatus;

public class ProjectDTO implements Project {

	private String id;
	private String title;
	private String description;
	private int status;
	private Long startDate;
	private Long endDate;

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

	@Override
	public Long getEndDate() {
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
	public void setStartDate(Long startDate) {
		this.startDate = startDate;
	}

	@Override
	public void setEndDate(Long endDate) {
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
}







































