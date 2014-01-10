package poolingpeople.webapplication.business.task.entity;

import java.util.HashMap;
import java.util.UUID;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.UUIDIndexContainer;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;

public class PersistedTask implements Task {

	private Node underlyingNode;
	private NeoManager manager;

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.TASK;

	public PersistedTask(NeoManager manager, String id)
			throws NotUniqueException, NodeNotFoundException {

		this.manager = manager;
		underlyingNode = manager.getUniqueNode(new UUIDIndexContainer(id));

	}

	public PersistedTask(NeoManager manager) throws NodeExistsException {
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
	public PersistedTask() throws NodeExistsException {
//		this(new NeoManager(GraphDatabaseServiceProducer.getGraphDb()));
	}

	public PersistedTask(NeoManager manager, Node node) {

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

	/*
	 * @todo: Intercept nullables and return a defaulted injected value... if
	 * possible
	 */

	@Override
	@JsonIgnore
	public TaskPriority getPriority() {
		try {
			return (manager.getStringProperty(underlyingNode,
					NodesPropertiesNames.PRIORITY.name()).equals("")) ? TaskPriority.NORMAL
					: TaskPriority.valueOf(manager.getStringProperty(
							underlyingNode,
							NodesPropertiesNames.PRIORITY.name()));
		} catch (NullPointerException e) {
			return TaskPriority.LOW;
		}
	}

	@Override
	public void setPriority(TaskPriority priority) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.PRIORITY.name(), priority.name());
	}

	@Override
	@JsonIgnore
	public TaskStatus getStatus() {
		try {
			return (manager.getStringProperty(underlyingNode,
					NodesPropertiesNames.STATUS.name()).equals("")) ? TaskStatus.NEW
					: TaskStatus
							.valueOf(manager.getStringProperty(underlyingNode,
									NodesPropertiesNames.STATUS.name()));
		} catch (NullPointerException e) {
			return TaskStatus.NEW;
		}
	}

	@Override
	public void setStatus(TaskStatus status) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.STATUS.name(),
				status.name());
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
		return obj instanceof PersistedTask
				&& ((PersistedTask) obj).getNode().equals(underlyingNode);
	}

        @Override
	public int hashCode() {
		return underlyingNode.hashCode();
	}

	public void addSubtask(Task child) {
		Relations.IS_SUBPROJECT_OF.relationIsPossibleOrException(NODE_TYPE,
				((PersistedTask) child).getNodeType());
		manager.createRelationshipTo(underlyingNode,
				((PersistedTask) child).getNode(), Relations.IS_SUBPROJECT_OF);
	}

	@Override
	public Integer getPriorityInteger() {
		return getPriority().getNumber();
	}

	@Override
	public void setPriorityInteger(Integer priority) {
		setPriority(TaskPriority.getPriority(priority));
	}

	@Override
	public Integer getStatusInteger() {
		return getStatus().getNumber();
	}

	@Override
	public void setStatusInteger(Integer status) {
		setStatus(TaskStatus.getStatus(status));  
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

}
