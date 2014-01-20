package poolingpeople.webapplication.business.task.entity;

import java.util.ArrayList;
import java.util.Collection;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationNotFoundException;

public class PersistedTask extends PersistedModel<Task> implements Task {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.TASK;

	public PersistedTask(NeoManager manager, String id)
			throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedTask(NeoManager manager, Task task) throws NodeExistsException {
		super(manager, NODE_TYPE, task);
	}

	/*
	 * Needed for json serialization. It will be called bz jax-rs (jackson) and
	 * therefore no instance of manager will be availabe. Exist som jackson
	 * provider interface?
	 */
	public PersistedTask() throws NodeExistsException {
		super(NODE_TYPE);
	}

	public PersistedTask(NeoManager manager, Node node) {
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

	public void addSubtask(PersistedModel<?> child) {
		createRelationTo(Relations.IS_SUBPROJECT_OF, child, true);
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

	@Override
	public void addEffort(Effort effort) {
		
		Integer totalEffort = getEffort() + effort.getTime();
		setEffort(totalEffort);
		createRelationTo(Relations.HAS_EFFORT, (PersistedModel) effort, true);
		
	}
	
	public void updateEfforts() {
		Collection<Effort> efforts = getEfforts();
		int totalEffort = 0;
		
		for (Effort effort : efforts) {
			totalEffort +=effort.getTime();
		}
		
		setEffort(totalEffort);
	}

	@Override
	public Collection<Effort> getEfforts() {

		Collection<Node> nodes = manager.getRelatedNodes(underlyingNode, Relations.HAS_EFFORT);
		return manager.getPersistedObjects(nodes, new ArrayList<Effort>(), PersistedEffort.class, Effort.class);
		
	}

	@Override
	public void deleteEffort(Effort effort) {
		
		if (!manager.relationExists(underlyingNode, ((PersistedModel) effort).getNode(), Relations.HAS_EFFORT)) {
			throw new RelationNotFoundException();
		}
		
		Integer totalEffort = getEffort() - effort.getTime();
		setEffort(totalEffort);
		
		manager.removeNode(((PersistedModel) effort).getNode());
	}
	
	@Override
	public void runDeletePreconditions() {
		
		for(Effort effort : getEfforts()) {
			deleteEffort(effort);
		}
	}
	
	private void setEffort(Integer totalEffort) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.EFFORT.name(), totalEffort);
	}

	@Override
	public Integer getEffort() {
		Integer totalEffort = manager.getIntegerProperty(underlyingNode, NodesPropertiesNames.EFFORT.name());
		
		if ( totalEffort == null) 
			totalEffort = 0;
		
		return totalEffort;
	}
}
























































