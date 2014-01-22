package poolingpeople.webapplication.business.project.entity;

import java.util.Collection;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationAlreadyExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationNotFoundException;
import poolingpeople.webapplication.business.task.entity.Task;

public class PersistedProject extends PersistedModel<Project> implements Project {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.PROJECT;
	
	public PersistedProject(NeoManager manager, String id)
			throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedProject(NeoManager manager, Project project) throws NodeExistsException {
		super(manager, NODE_TYPE, project);
	}

	/*
	 * Needed for json serialization. It will be called bz jax-rs (jackson) and
	 * therefore no instance of manager will be availabe. Exist som jackson
	 * provider interface?
	 */
	public PersistedProject() throws NodeExistsException {
		super(NODE_TYPE);
	}

	public PersistedProject(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	@Override
	public String getTitle() {
		return getStringProperty(NodesPropertiesNames.TITLE);
	}

	@Override
	public void setTitle(String title) {
		setProperty(NodesPropertiesNames.TITLE, title);
	}

	@Override
	public String getDescription() {
		return getStringProperty(NodesPropertiesNames.DESCRIPTION);
	}

	@Override
	public void setDescription(String description) {
		setProperty(NodesPropertiesNames.DESCRIPTION, description);
	}

	@Override
	public Long getStartDate() {
		return getLongProperty(NodesPropertiesNames.START_DATE);
	}

	@Override
	public void setStartDate(Long startDate) {
		setProperty(NodesPropertiesNames.START_DATE, startDate);
	}

	@Override
	public Long getEndDate() {
		return getLongProperty(NodesPropertiesNames.END_DATE);
	}

	@Override
	public void setEndDate(Long endDate) {
		setProperty(NodesPropertiesNames.END_DATE, endDate);
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedProject
				&& ((PersistedProject) obj).getNode().equals(underlyingNode);
	}

	@Override
	public int hashCode() {
		return underlyingNode.hashCode();
	}

	public void addSubtask(Project child) {
		Relations.IS_SUBPROJECT_OF.relationIsPossibleOrException(NODE_TYPE,
				((PersistedProject) child).getNodeType());
		manager.createRelationshipTo(underlyingNode,
				((PersistedProject) child).getNode(), Relations.IS_SUBPROJECT_OF);
	}
	
	@Override
	public Integer getStatusInteger() {
		return getStatus().getNumber();
	}

	@Override
	public void setStatusInteger(Integer status) {
		setStatus(ProjectStatus.getStatus(status));  
	}

	@Override
	public ProjectStatus getStatus() {
		try {
			return (getStringProperty(NodesPropertiesNames.STATUS).equals("")) ? ProjectStatus.NEW
					: ProjectStatus
							.valueOf(getStringProperty(NodesPropertiesNames.STATUS));
		} catch (NullPointerException e) {
			return ProjectStatus.NEW;
		}
	}

	@Override
	public void setStatus(ProjectStatus status) {
		setProperty(NodesPropertiesNames.STATUS, status.name());		
	}

	@Override
	public void addTask(Task task) {
		
		if (manager.relationExists(underlyingNode, ((PersistedModel<?>) task).getNode(), Relations.HAS)) {
			throw new RelationAlreadyExistsException();
		}
		
		manager.createRelationshipTo(underlyingNode, ((PersistedModel<?>) task).getNode(), Relations.HAS);
		
	}

	@Override
	public void removeTask(Task task) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Collection<Task> getTasks() {
		// TODO Auto-generated method stub
		return null;
	}

}





















































































