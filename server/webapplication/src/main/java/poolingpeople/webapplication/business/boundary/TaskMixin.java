package poolingpeople.webapplication.business.boundary;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonView;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.Task;
import poolingpeople.webapplication.business.entity.TaskPriority;
import poolingpeople.webapplication.business.entity.TaskStatus;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;

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
	public void setStatus(Integer status) {
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
}
