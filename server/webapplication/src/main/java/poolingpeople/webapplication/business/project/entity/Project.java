package poolingpeople.webapplication.business.project.entity;

public interface Project {
	
	String getId();

	String getTitle();

	void setTitle(String title);

	String getDescription();

	void setDescription(String description);

	Integer getStatusInteger();
	
	ProjectStatus getStatus();
	void setStatus(ProjectStatus status);

	void setStatusInteger(Integer status);
	
	Long getStartDate();

	void setStartDate(Long startDate);

	Long getEndDate();

	void setEndDate(Long endDate);


}

















