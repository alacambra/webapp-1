package poolingpeople.webapplication.business.entity;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;

public interface ITask {

	PoolingpeopleObjectType getNodeType();

	Node getNode();

	String getId();

	String getTitel();

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