package poolingpeople.webapplication.business.user.entity;

import java.util.HashMap;
import java.util.UUID;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.UUIDIndexContainer;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;

public class PersistedUser implements User {

	private Node underlyingNode;
	private NeoManager manager;

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.TASK;

	public PersistedUser(NeoManager manager, String id)
			throws NotUniqueException, NodeNotFoundException {

		this.manager = manager;
		underlyingNode = manager.getUniqueNode(new UUIDIndexContainer(id));

	}

	public PersistedUser(NeoManager manager) throws NodeExistsException {
		this.manager = manager;
		HashMap<String, Object> props = new HashMap<String, Object>();
		underlyingNode = manager.createNode(props, new UUIDIndexContainer(UUID
				.randomUUID().toString()), NODE_TYPE);
	}

	/*
	 * Needed for json serialization. It will be called bz jax-rs (jackson) and
	 * therefore no instance of manager will be availabe. Exist som jackson
	 * provider interface?
	 */
	public PersistedUser() throws NodeExistsException {
//		this(new NeoManager(GraphDatabaseServiceProducer.getGraphDb()));
	}

	public PersistedUser(NeoManager manager, Node node) {

		String nodeType = manager.getStringProperty(node,
				NodesPropertiesNames.TYPE.name());
		if (!PoolingpeopleObjectType.valueOf(nodeType).equals(NODE_TYPE)) {
			throw new IllegalArgumentException("Node must be of type "
					+ NODE_TYPE + ". " + nodeType + " found.");
		}

		underlyingNode = node;
		this.manager = manager;

	}

	public PoolingpeopleObjectType getNodeType() {
		return NODE_TYPE;
	}

	public Node getNode() {
		return underlyingNode;
	}

	@Override
	public String getId() {
		return manager.getStringProperty(underlyingNode,
				NodesPropertiesNames.ID.name());
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
	public Float getProgress() {
		return manager.getFloatProperty(underlyingNode,
				NodesPropertiesNames.PROGRESS.name());
	}

	@Override
	public void setProgress(Float progress) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.PROGRESS.name(), progress);
	}

        @Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedUser
				&& ((PersistedUser) obj).getNode().equals(underlyingNode);
	}

        @Override
	public int hashCode() {
		return underlyingNode.hashCode();
	}

	public void addSubtask(User child) {
		Relations.IS_SUBPROJECT_OF.relationIsPossibleOrException(NODE_TYPE,
				((PersistedUser) child).getNodeType());
		manager.createRelationshipTo(underlyingNode,
				((PersistedUser) child).getNode(), Relations.IS_SUBPROJECT_OF);
	}

	@Override
	public Integer getDuration() {
		return manager.getIntegerProperty(underlyingNode,
				NodesPropertiesNames.DURATION.name());
	}

	@Override
	public void setDuration(Integer duration) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.DURATION.name(), duration);
	}

	@Override
	public Integer getPriorityInteger() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setPriorityInteger(Integer priority) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Integer getStatusInteger() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setStatusInteger(Integer status) {
		// TODO Auto-generated method stub
		
	}
}
