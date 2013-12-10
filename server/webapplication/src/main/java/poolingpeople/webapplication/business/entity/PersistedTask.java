package poolingpeople.webapplication.business.entity;

import java.util.HashMap;
import java.util.UUID;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.UUIDIndexContainer;

public class PersistedTask implements ITask {

	private Node underlyingNode;
	private NeoManager manager;

	@JsonIgnore
	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.TASK;

	public PersistedTask(NeoManager manager, String id){

		this.manager = manager;
		underlyingNode = manager.getUniqueNode(new UUIDIndexContainer(id));

	}

	public PersistedTask(NeoManager manager){
		this.manager = manager;
		HashMap<String, Object> props = new HashMap<String, Object>();
		underlyingNode = manager.createNode(props, new UUIDIndexContainer(UUID.randomUUID().toString()), NODE_TYPE);

	}
	
	/*
	 * Needed for json serialization. It will be called bz jax-rs (jackson) and therefore no instance of manager will be availabe
	 * Exist som jackson provider interface? 
	 */
	public PersistedTask(){
		this(new NeoManager(GraphDatabaseServiceProducer.getGraphDb()));
	}
	
	public PersistedTask(NeoManager manager, Node node) {

		String nodeType = manager.getStringProperty(node, NodesPropertiesNames.TYPE.name());
		if ( !PoolingpeopleObjectType.valueOf(nodeType).equals(NODE_TYPE) ) {
			throw new IllegalArgumentException("Node must be of type " + NODE_TYPE + ". " + nodeType + " found.");
		}

		underlyingNode = node;
		this.manager = manager;

	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getNodeType()
	 */
	@Override
	@JsonIgnore
	public PoolingpeopleObjectType getNodeType() {
		return NODE_TYPE;
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getNode()
	 */
	@Override
	@JsonIgnore
	public Node getNode() {
		return underlyingNode;
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getId()
	 */
	@Override
	public String getId() {
		return manager.getStringProperty(underlyingNode, NodesPropertiesNames.ID.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getTitel()
	 */
	@Override
	public String getTitel() {
		return manager.getStringProperty(underlyingNode, NodesPropertiesNames.TITLE.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#setTitle(java.lang.String)
	 */
	@Override
	public void setTitle(String title) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.TITLE.name(), title);
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getDescription()
	 */
	@Override
	public String getDescription() {
		return manager.getStringProperty(underlyingNode, NodesPropertiesNames.DESCRIPTION.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#setDescription(java.lang.String)
	 */
	@Override
	public void setDescription(String description) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.DESCRIPTION.name(), description);
	}

	/*
	 * @todo: Intercept nullables and return a defaulted injected value... if possible 
	 */
	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getPriority()
	 */
	@Override
	@JsonIgnore
	public TaskPriority getPriority() {
		return TaskPriority.valueOf(manager.getStringProperty(underlyingNode, NodesPropertiesNames.PRIORITY.name()));
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#setPriority(poolingpeople.webapplication.business.entity.TaskPriority)
	 */
	@Override
	public void setPriority(TaskPriority priority) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.PRIORITY.name(), priority.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getStatus()
	 */
	@Override
	@JsonIgnore
	public TaskStatus getStatus() {
		return  TaskStatus.valueOf(manager.getStringProperty(underlyingNode, NodesPropertiesNames.STATUS.name()));
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#setStatus(poolingpeople.webapplication.business.entity.TaskStatus)
	 */
	@Override
	public void setStatus(TaskStatus status) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.STATUS.name(), status.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getStartDate()
	 */
	@Override
	public Long getStartDate() {
		return manager.getLongProperty(underlyingNode, NodesPropertiesNames.START_DATE.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#setStartDate(java.lang.Long)
	 */
	@Override
	public void setStartDate(Long startDate) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.START_DATE.name(), startDate);;
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getEndDate()
	 */
	@Override
	public Long getEndDate() {
		return manager.getLongProperty(underlyingNode, NodesPropertiesNames.END_DATE.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#setEndDate(java.lang.Long)
	 */
	@Override
	public void setEndDate(Long endDate) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.END_DATE.name(), endDate);;
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#getProgress()
	 */
	@Override
	public Integer getProgress() {
		return manager.getIntegerProperty(underlyingNode, NodesPropertiesNames.PROGRESS.name());
	}

	/* (non-Javadoc)
	 * @see poolingpeople.webapplication.business.entity.ITask#setProgress(int)
	 */
	@Override
	public void setProgress(int progress) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.PROGRESS.name(), progress);
	}

	public boolean equals(Object obj) {
		return obj instanceof PersistedTask &&
				((PersistedTask)obj).getNode().equals(underlyingNode);
	}

	public int hashCode() {
		return underlyingNode.hashCode();
	}
}




















































