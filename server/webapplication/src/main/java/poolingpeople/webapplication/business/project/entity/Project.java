package poolingpeople.webapplication.business.project.entity;

import java.util.Collection;

import poolingpeople.webapplication.business.task.entity.Task;

public interface Project{
	
	/**
	 * UUID of a node. 
	 * @return
	 */
	String getId();
	String getTitle();
	void setTitle(String title);
	String getDescription();
	void setDescription(String description);
	
	/**
	 * Return an integer representing the current status
	 * @return
	 */
	Integer getStatusInteger();
	
	/**
	 * Return the status as enumeration
	 * @return
	 */
	ProjectStatus getStatus();
	void setStatus(ProjectStatus status);
	void setStatusInteger(Integer status);
	
	/**
	 * When the project begins. It can be given manually but if a child or more exists the smaller of all dates will be taken  
	 * @return
	 */
	Long getStartDate();
	void setDefaultStartDate(Long startDate);
	
	/**
	 * When the project ends. It can be given manually but if a child or more exists the bigger of all dates will be taken 
	 * @return
	 */
	Long getEndDate();
	void setDefaultEndDate(Long endDate);
	
	/**
	 * Deletes the relation with a task. 
	 * Inherited attributes must be recalculated.
	 * 
	 * @param task
	 */
	void removeTask(Task task);
	
	/**
	 * Fetch all root tasks related to a project.
	 * @return
	 */
	Collection<Task> getTasks();
	
	/**
	 * Relates the project with the given task.
	 * Inherited attributes must be recalculated.
	 * @param task
	 */
	void addTask(Task task);
	/**
	 * Efforts done in this projects. Efforts come always from tasks and are just summed
	 * @return
	 */
	Integer getEffort();
	
	/**
	 * indicates the project that must update its effort
	 */
	void updateEffort();
	
	/**
	 * indicates the project that must update its progress
	 */
	void updateProgress();
	
	/**
	 * return the progress of the project, calculates using the progress of the tasks 
	 * @return
	 */
	Float getProgress();
	
	/**
	 * indicates the project that must update start and end date
	 */
	void updateDates();
	
	/**
	 * All updates must be executed
	 */
	void updateAll();
	void setDefaultProgress(Float progress);

}

















