package poolingpeople.webapplication.business.task.boundary;

import java.util.Collection;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonView;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.boundary.JsonViews;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.task.entity.TaskPriority;
import poolingpeople.webapplication.business.task.entity.TaskStatus;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TaskMixin implements Task{

	@Override
	@JsonView(JsonViews.Shared.class)
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
	@JsonView(JsonViews.Basic.class)
	public String getTitle() {
		return null;
	}

	@Override
	public void setTitle(String title) {
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	public String getDescription() {
		return null;
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	public void setDescription(String description) {
	}

	@Override
	@JsonIgnore
	public TaskPriority getPriority() {
		return null;
	}

	@Override
	public void setPriority(TaskPriority priority) {
	}

	@Override
	@JsonIgnore
	public TaskStatus getStatus() {
		return null;
	}

	@Override
	public void setStatus(TaskStatus status) {
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	public Long getStartDate() {
		return null;
	}


	@Override
	@JsonView(JsonViews.Basic.class)
	public Long getEndDate() {
		return null;
	}


	@Override
	@JsonView(JsonViews.Basic.class)
	public Float getProgress() {
		return null;
	}


	@Override
	@JsonProperty(value="priority")
	@JsonView(JsonViews.Basic.class)
	public Integer getPriorityInteger() {
		return null;
	}

	@Override
	@JsonProperty(value="priority")
	public void setPriorityInteger(Integer priority) {
		
	}

	@Override
	@JsonProperty(value="status")
	@JsonView(JsonViews.Basic.class)
	public Integer getStatusInteger() {
		return null;
	}

	@Override
	@JsonProperty(value="status")
	public void setStatusInteger(Integer status) {
		
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	public Integer getDuration() {
		return null;
	}

	@Override
	public void setDefaultDuration(Integer duration) {
		
	}

	@Override
	public void addEffort(Effort effort) {
		
	}

	@Override
	@JsonView(JsonViews.FullTaskWithElements.class)
	public Collection<Effort> getEfforts() {
		return null;
	}

	@Override
	public void deleteEffort(Effort effort) {
		
	}

	@Override
	@JsonView(JsonViews.FullTask.class)
	public Integer getEffort() {
		return null;
	}

	@Override
	@JsonView(JsonViews.FullTask.class)
	public Project getProject() {
		return null;
	}

	@Override
	public void setDefaultStartDate(Long startDate) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setDefaultEndDate(Long endDate) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setDefaultProgress(Float progress) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateProgress() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateDates() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateAll() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateDuration() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void updateEfforts() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addSubtask(Task child) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeSubtask(Task child){
		// TODO Auto-generated method stub
		
	}
}
