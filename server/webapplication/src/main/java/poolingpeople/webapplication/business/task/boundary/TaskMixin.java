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
import poolingpeople.webapplication.business.user.entity.User;

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
	@JsonView(JsonViews.FullTask.class)
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
	@JsonView(JsonViews.FullTask.class)
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
	@JsonView(JsonViews.Basic.class)
	public Integer getEffort() {
		return null;
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	@JsonIgnore
	public Project getProject() {
		return null;
	}

	@Override
	public void setDefaultStartDate(Long startDate) {
		
	}

	@Override
	public void setDefaultEndDate(Long endDate) {
		
	}

	@Override
	public void setDefaultProgress(Float progress) {
		
	}

	@Override
	public void updateProgress() {
		
	}

	@Override
	public void updateDates() {
		
	}

	@Override
	public void updateAll() {
		
	}

	@Override
	public void updateDuration() {
		
	}

	@Override
	public void updateEfforts() {
		
	}

	@Override
	public void addSubtask(Task child) {
		
	}

	@Override
	public void removeSubtask(Task child){
		
	}

	@Override
	public void removeTaskRelation(Task child) {
		
	}

	@Override
	public void setAssignee(User u) {
		
	}

	@Override
	@JsonIgnore
	public Task getParent() {
		return null;
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	public User getAssignee() {
		return null;
	}

	@Override
	public String getParentId() {
		// TODO Auto-generated method stub
		return null;
	}
}
