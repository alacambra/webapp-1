package poolingpeople.webapplication.business.project.boundary;

import java.util.Collection;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.project.entity.ProjectStatus;
import poolingpeople.webapplication.business.task.entity.Task;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProjectMixin implements Project{

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
	public ProjectStatus getStatus() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setStatus(ProjectStatus status) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Long getStartDate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Collection<Task> getTasks() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void removeTask(Task task) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addTask(Task task) {
		// TODO Auto-generated method stub
		
	}
}
