package poolingpeople.webapplication.business.task.entity;

import java.util.ArrayList;
import java.util.Collection;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodePropertyName;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationNotFoundException;
import poolingpeople.webapplication.business.project.entity.PersistedProject;
import poolingpeople.webapplication.business.project.entity.Project;

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
	 * Needed for json serialization. It will be called by jax-rs (jackson) and
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
				NodePropertyName.TITLE.name());
	}

	@Override
	public void setTitle(String title) {
		manager.setProperty(underlyingNode, NodePropertyName.TITLE.name(),
				title);
	}

	@Override
	public String getDescription() {
		return manager.getStringProperty(underlyingNode,
				NodePropertyName.DESCRIPTION.name());
	}

	@Override
	public void setDescription(String description) {
		manager.setProperty(underlyingNode,
				NodePropertyName.DESCRIPTION.name(), description);
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
					NodePropertyName.PRIORITY.name()).equals("")) ? TaskPriority.NORMAL
							: TaskPriority.valueOf(manager.getStringProperty(
									underlyingNode,
									NodePropertyName.PRIORITY.name()));
		} catch (NullPointerException e) {
			return TaskPriority.LOW;
		}
	}

	@Override
	public void setPriority(TaskPriority priority) {
		manager.setProperty(underlyingNode,
				NodePropertyName.PRIORITY.name(), priority.name());
	}

	@Override
	@JsonIgnore
	public TaskStatus getStatus() {
		try {
			return (manager.getStringProperty(underlyingNode,
					NodePropertyName.STATUS.name()).equals("")) ? TaskStatus.NEW
							: TaskStatus
							.valueOf(manager.getStringProperty(underlyingNode,
									NodePropertyName.STATUS.name()));
		} catch (NullPointerException e) {
			return TaskStatus.NEW;
		}
	}

	@Override
	public void setStatus(TaskStatus status) {
		manager.setProperty(underlyingNode, NodePropertyName.STATUS.name(),
				status.name());
	}

	@Override
	public Long getStartDate() {
		return manager.getLongProperty(underlyingNode,
				NodePropertyName.START_DATE.name());
	}

	@Override
	public void setStartDate(Long startDate) {
		manager.setProperty(underlyingNode,
				NodePropertyName.START_DATE.name(), startDate);
	}

	@Override
	public Long getEndDate() {
		return manager.getLongProperty(underlyingNode,
				NodePropertyName.END_DATE.name());
	}

	@Override
	public void setEndDate(Long endDate) {
		manager.setProperty(underlyingNode,
				NodePropertyName.END_DATE.name(), endDate);
	}

	@Override
	public Float getProgress() {
		return manager.getFloatProperty(underlyingNode,
				NodePropertyName.PROGRESS.name());
	}

	@Override
	public void setProgress(Float progress) {
		manager.setProperty(underlyingNode,
				NodePropertyName.PROGRESS.name(), progress);
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

	public void addSubproject(PersistedModel<?> child) {
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
				NodePropertyName.DURATION.name());
	}

	@Override
	public void setDuration(Integer duration) {
		manager.setProperty(underlyingNode,
				NodePropertyName.DURATION.name(), new Integer(duration));
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
		
		Project p = getProject();
		if( p != null ){
			p.removeTask(this);
		}
	}
	
	private void setEffort(Integer totalEffort) {
		manager.setProperty(underlyingNode, NodePropertyName.EFFORT.name(), totalEffort);
	}
	
	public Project getProject() {
		
		Node n = manager.getRelatedNode(underlyingNode, Relations.HAS_TASK_ASSIGNED);
		
		if ( n != null ) {
			return new PersistedProject(manager, n);
		}
		
		return null;
	}

	@Override
	public Integer getEffort() {
		Integer totalEffort = manager.getIntegerProperty(underlyingNode, NodePropertyName.EFFORT.name());
		
		if ( totalEffort == null) 
			totalEffort = 0;
		
		return totalEffort;
	}

}
























































