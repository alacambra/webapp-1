package poolingpeople.webapplication.business.entity;

public interface ITask {
	
	String getId();

	String getTitle();

	void setTitle(String title);

	String getDescription();

	void setDescription(String description);

	/*
	 * @todo: Intercept nullables and return a defaulted injected value... if possible 
	 */
	TaskPriority getPriority();
	
	Integer getPriorityInteger();
	
	void setPriorityInteger(Integer priority);

	void setPriority(TaskPriority priority);

	TaskStatus getStatus();
	
	Integer getStatusInteger();

	void setStatus(Integer status);
	
	void setStatus(TaskStatus status);

	Long getStartDate();

	void setStartDate(Long startDate);

	Long getEndDate();

	void setEndDate(Long endDate);

	Float getProgress();

	void setProgress(Float progress);
	
	Integer getDuration();
	void setDuration(Integer duration); 
	
	

}

















