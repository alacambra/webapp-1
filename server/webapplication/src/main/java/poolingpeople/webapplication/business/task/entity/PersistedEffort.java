package poolingpeople.webapplication.business.task.entity;

import org.neo4j.graphdb.Direction;
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

	@Override
	public Long getDate() {
		return getLongProperty(NodePropertyName.DATE);
	}

	@Override
	public void setDate(Long date) {
		setProperty(NodePropertyName.DATE, date);

	}

	@Override
	public String getComment() {
		return getStringProperty(NodePropertyName.COMMENT);
	}

	@Override
	public void setComment(String comment) {
		setProperty(NodePropertyName.COMMENT, comment);
	}

	@Override
	public Integer getTime() {
		return getIntegerProperty(NodePropertyName.TIME);
	}

	@Override
	public void setTime(Integer time) {

		setProperty(NodePropertyName.TIME, time);
		PersistedTask task = getRelatedNode(Relations.HAS_EFFORT, PersistedTask.class);

		if ( !isCreated ) {
			return;
		}
		
		if ( task == null ) {
			throw new ConsistenceException("Effort " + getId() + " has no task");
		}
		
		task.updateEfforts();

	}

	@Override
	protected void initializeVariables() {
		if ( getTime() == null )
			setTime(0);
	}

	@Override
	public String getTaskId() {
		return getRelatedNode(Relations.HAS_EFFORT, PersistedTask.class, Direction.INCOMING).getId();
	}


}
