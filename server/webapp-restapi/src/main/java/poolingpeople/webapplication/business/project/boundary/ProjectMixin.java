package poolingpeople.webapplication.business.project.boundary;

import java.util.Collection;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonView;
import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.Project;
import poolingpeople.commons.entities.ProjectStatus;
import poolingpeople.commons.entities.Task;
import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.boundary.JsonViews;

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
	@JsonView(JsonViews.BasicProject.class)
	public String getDescription() {
		return null;
	}

	@Override
	public void setDescription(String description) {
	}


	@Override
	@JsonProperty("startDate")
	public void setDefaultStartDate(Long startDate) {
	}

	@Override
	@JsonView(JsonViews.BasicProject.class)
	public Long getEndDate() {
		return null;
	}

	@Override
	@JsonProperty("endDate")
	public void setDefaultEndDate(Long endDate) {

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
	@JsonView(JsonViews.BasicProject.class)
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
	@JsonView(JsonViews.BasicProject.class)
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
	@JsonView(JsonViews.BasicProject.class)
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
		
		
	}

	@Override
	@JsonIgnore
	public void setOwner(User owner) {
		 
	}

	@Override
	@JsonProperty
	@JsonView(JsonViews.BasicProject.class)
	public User getOwner() {
		return null;
	}
}
