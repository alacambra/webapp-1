package poolingpeople.webapplication.business.task.boundary;

import java.util.Collection;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonSetter;
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
	@JsonView(JsonViews.BasicTask.class)
	public String getTitle() {
		return null;
	}

	@Override
	public void setTitle(String title) {
	}

	@Override
	@JsonView(JsonViews.BasicTask.class)
	public String getDescription() {
		return null;
	}

	@Override
	@JsonView(JsonViews.BasicTask.class)
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
	@JsonView(JsonViews.BasicTask.class)
	public Long getStartDate() {
		return null;
	}


	@Override
	@JsonView(JsonViews.BasicTask.class)
	public Long getEndDate() {
		return null;
	}


	@Override
	@JsonView(JsonViews.BasicTask.class)
	public Float getProgress() {
		return null;
	}


	@Override
	@JsonProperty(value="priority")
	@JsonView(JsonViews.BasicTask.class)
	public Integer getPriorityInteger() {
		return null;
	}

	@Override
	@JsonProperty(value="priority")
	public void setPriorityInteger(Integer priority) {
		
	}

	@Override
	@JsonProperty(value="status")
	@JsonView(JsonViews.BasicTask.class)
	public Integer getStatusInteger() {
		return null;
	}

	@Override
	@JsonProperty(value="status")
	public void setStatusInteger(Integer status) {
		
	}

	@Override
	@JsonView(JsonViews.BasicTask.class)
	@JsonProperty(value="duration")
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
	@JsonView(JsonViews.BasicTask.class)
	public Integer getEffort() {
		return null;
	}

	@Override
	@JsonView(JsonViews.BasicTask.class)
	public Project getProject() {
		return null;
	}

	@Override
	@JsonProperty("startDate")
	public void setDefaultStartDate(Long startDate) {
		
	}

	@Override
	@JsonProperty("endDate")
	public void setDefaultEndDate(Long endDate) {
		
	}

	@Override
	@JsonProperty("progress")
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
	@JsonIgnore
	public void setAssignee(User u) {
		
	}

	@Override
	@JsonIgnore
	public Task getParent() {
		return null;
	}

	@Override
	@JsonView(JsonViews.BasicTask.class)
	public User getAssignee() {
		return null;
	}

	@Override
	@JsonView(JsonViews.Shared.class)
	public String getParentId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@JsonView(JsonViews.NeverUsed.class)
	public List<Task> getSubtasks() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@JsonView(JsonViews.BasicTask.class)
	public Integer getSubtaskCount() {
		// TODO Auto-generated method stub
		return null;
	}
}
