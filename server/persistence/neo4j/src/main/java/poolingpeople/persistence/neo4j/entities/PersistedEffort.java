package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.Effort;
import poolingpeople.persistence.neo4j.*;
import poolingpeople.persistence.neo4j.exceptions.*;
import poolingpeople.persistence.neo4j.inheritance.Inheritable;

public class PersistedEffort extends AbstractPersistedModel<PersistedEffort> implements Effort{

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.EFFORT;
	
	/*
	 * Used to know if the model is already built and consistent.
	 */
	
	/*
	 * @todo: in the system defaults must be loaded
	 */
	public PersistedEffort(NeoManager manager, Effort effort) throws NodeExistsException {
//		super(manager, NODE_TYPE, effort);
		if(getTime() == null) {
			setTime(0);
		}
	}

	 public PersistedEffort() {
		// TODO Auto-generated constructor stub
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
		PersistedTask task = getEndNode(Relations.HAS_EFFORT, PersistedTask.class);

		if ( !isCreated ) {
			return;
		}
		
		if ( task == null ) {
			throw new ConsistenceException("Effort " + getId() + " has no task");
		}

		/*
		 * @todo that requires some kind o update manager 
		 */
		
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

	@Override
	public void synchronizeWith(Object tplObject) {
		// TODO Auto-generated method stub
		
	}


}
