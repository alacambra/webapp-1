package poolingpeople.webapplication.business.entity;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;

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

	void setPriority(TaskPriority priority);

	TaskStatus getStatus();

	void setStatus(TaskStatus status);

	Long getStartDate();

	void setStartDate(Long startDate);

	Long getEndDate();

	void setEndDate(Long endDate);

	Integer getProgress();

	void setProgress(int progress);

}