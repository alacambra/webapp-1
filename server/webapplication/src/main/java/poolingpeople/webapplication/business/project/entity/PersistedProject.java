package poolingpeople.webapplication.business.project.entity;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;

public class PersistedProject extends PersistedModel implements Project {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.PROJECT;
	
	public PersistedProject(NeoManager manager, String id)
			throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedProject(NeoManager manager) throws NodeExistsException {
		super(manager, NODE_TYPE);
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
		return manager.getStringProperty(underlyingNode,
				NodesPropertiesNames.TITLE.name());
	}

	@Override
	public void setTitle(String title) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.TITLE.name(),
				title);
	}

	@Override
	public String getDescription() {
		return manager.getStringProperty(underlyingNode,
				NodesPropertiesNames.DESCRIPTION.name());
	}

	@Override
	public void setDescription(String description) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.DESCRIPTION.name(), description);
	}

	@Override
	public Long getStartDate() {
		return manager.getLongProperty(underlyingNode,
				NodesPropertiesNames.START_DATE.name());
	}

	@Override
	public void setStartDate(Long startDate) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.START_DATE.name(), startDate);
	}

	@Override
	public Long getEndDate() {
		return manager.getLongProperty(underlyingNode,
				NodesPropertiesNames.END_DATE.name());
	}

	@Override
	public void setEndDate(Long endDate) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.END_DATE.name(), endDate);
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
			return (manager.getStringProperty(underlyingNode,
					NodesPropertiesNames.STATUS.name()).equals("")) ? ProjectStatus.NEW
					: ProjectStatus
							.valueOf(manager.getStringProperty(underlyingNode,
									NodesPropertiesNames.STATUS.name()));
		} catch (NullPointerException e) {
			return ProjectStatus.NEW;
		}
	}

	@Override
	public void setStatus(ProjectStatus status) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.STATUS.name(),
				status.name());		
	}

}
