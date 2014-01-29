package poolingpeople.webapplication.business.task.entity;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.AbstractPersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodePropertyName;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.ConsistenceException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;

public class PersistedEffort extends AbstractPersistedModel<Effort> implements Effort{

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.EFFORT;
	
	/*
	 * Used to know if the model is already built and consistent.
	 */
	
	
	public PersistedEffort(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	/*
	 * @todo: in the system defaults must be loaded
	 */
	public PersistedEffort(NeoManager manager, Effort effort) throws NodeExistsException {
		super(manager, NODE_TYPE, effort);
		if(getTime() == null) {
			setTime(0);
		}
	}

	public PersistedEffort(NeoManager manager, String id) throws NotUniqueException,
	NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

//	public PersistedEffort() throws NodeExistsException {
//		super(NODE_TYPE);
//	}

	@Override
	public Long getDate() {
		return manager.getLongProperty(underlyingNode, NodePropertyName.DATE.name());
	}

	@Override
	public void setDate(Long date) {
		manager.setProperty(underlyingNode, NodePropertyName.DATE.name(), date);

	}

	@Override
	public String getComment() {
		return manager.getStringProperty(underlyingNode, NodePropertyName.COMMENT.name());
	}

	@Override
	public void setComment(String comment) {
		manager.setProperty(underlyingNode, NodePropertyName.COMMENT.name(), comment);
	}

	@Override
	public Integer getTime() {
		return manager.getIntegerProperty(underlyingNode, NodePropertyName.TIME.name());
	}

	@Override
	public void setTime(Integer time) {

		manager.setProperty(underlyingNode, NodePropertyName.TIME.name(), time);
		Node n = manager.getRelatedNode(underlyingNode, Relations.HAS_EFFORT);

		if ( !isCreated ) {
			return;
		}
		
		if ( n == null ) {
			throw new ConsistenceException("Effort " + getId() + " has no task");
		}
		
		PersistedTask persistedTask = new PersistedTask(manager, n);
		persistedTask.updateEfforts();

	}

	@Override
	protected void initializeVariables() {
		
	}


}
