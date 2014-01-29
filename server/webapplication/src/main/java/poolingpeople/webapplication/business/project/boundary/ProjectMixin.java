package poolingpeople.webapplication.business.project.boundary;

import java.util.Collection;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonView;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.boundary.JsonViews;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.project.entity.ProjectStatus;
import poolingpeople.webapplication.business.task.entity.Task;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectMixin implements Project{

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
	@JsonView(JsonViews.Shared.class)
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
	public void setDescription(String description) {
	}


	@Override
	public void setDefaultStartDate(Long startDate) {
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	public Long getEndDate() {
		return null;
	}

	@Override
	public void setDefaultEndDate(Long endDate) {

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
	@JsonIgnore
	public ProjectStatus getStatus() {
		return null;
	}

	@Override
	public void setStatus(ProjectStatus status) {
	}

	@Override
	@JsonView(JsonViews.Basic.class)
	public Long getStartDate() {
		return null;
	}

	@Override
	@JsonView(JsonViews.FullProjectWithElements.class)
	public Collection<Task> getTasks() {
		return null;
	}

	@Override
	public void removeTask(Task task) {
	}

	@Override
	public void addTask(Task task) {
	}

	@Override
	@JsonView(JsonViews.FullProject.class)
	public Integer getEffort() {
		return null;
	}

	@Override
	public void updateEffort() {
	}

	@Override
	public void updateProgress() {
	}

	@Override
	@JsonView(JsonViews.FullProject.class)
	public Float getProgress() {
		return null;
	}

	@Override
	public void updateDates() {
	}

	@Override
	public void updateAll() {
	}

	@Override
	public void setDefaultProgress(Float progress) {
	}

	@Override
	@JsonView(JsonViews.Shared.class)
	public Integer getTaskCount() {
		return null;
	}

	@Override
	public void removeTaskRelation(Task task) {
		// TODO Auto-generated method stub
		
	}
}
