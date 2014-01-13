package poolingpeople.webapplication.business.task.boundary;

import java.util.Collection;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.task.entity.TaskPriority;
import poolingpeople.webapplication.business.task.entity.TaskStatus;

public class TaskMixin implements Task{

	@Override
//	@JsonView(View.SampleView.class)
	public String getId() {
		return null;
	}
	
	@JsonIgnore
	public Node getNode() {
		return null;
	}
	
	@JsonIgnore
	public PoolingpeopleObjectType getNodeType() {
		return null;
	}

	@Override
//	@JsonView(View.NoSend.class)
	public String getTitle() {
		return null;
	}

	@Override
	public void setTitle(String title) {
	}

	@Override
	public String getDescription() {
		return null;
	}

	@Override
	public void setDescription(String description) {
	}

	@Override
	public TaskPriority getPriority() {
		return null;
	}

	@Override
	public void setPriority(TaskPriority priority) {
	}

	@Override
	public TaskStatus getStatus() {
		return null;
	}

	@Override
	public void setStatus(TaskStatus status) {
	}

	@Override
	public Long getStartDate() {
		return null;
	}

	@Override
	public void setStartDate(Long startDate) {
	}

	@Override
	public Long getEndDate() {
		return null;
	}

	@Override
	public void setEndDate(Long endDate) {

	}

	@Override
	public Float getProgress() {
		return null;
	}

	@Override
	public void setProgress(Float progress) {
	}

	@Override
	@JsonProperty(value="priority")
	public Integer getPriorityInteger() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@JsonProperty(value="priority")
	public void setPriorityInteger(Integer priority) {
		// TODO Auto-generated method stub
		
	}

	@Override
	@JsonProperty(value="status")
	public Integer getStatusInteger() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@JsonProperty(value="status")
	public void setStatusInteger(Integer status) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Integer getDuration() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setDuration(Integer duration) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addEffort(Effort effort) {
		// TODO Auto-generated method stub
		
	}

	@Override
	@JsonIgnore
	public Collection<Effort> getEfforts() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteEffort(Effort effort) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Integer getEffort() {
		// TODO Auto-generated method stub
		return null;
	}
}
