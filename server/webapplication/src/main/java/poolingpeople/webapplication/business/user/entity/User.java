package poolingpeople.webapplication.business.user.entity;

public interface User {
	
	String getId();

	String getTitle();

	void setTitle(String title);

	String getDescription();

	void setDescription(String description);

	Integer getPriorityInteger();
	
	void setPriorityInteger(Integer priority);

	Integer getStatusInteger();

	void setStatusInteger(Integer status);
	
	Long getStartDate();

	void setStartDate(Long startDate);

	Long getEndDate();

	void setEndDate(Long endDate);

	Float getProgress();

	void setProgress(Float progress);
	
	Integer getDuration();
	void setDuration(Integer duration); 
	
	

}

















