package poolingpeople.persistence.neo4j.entities;

import java.util.List;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.Comment;
import poolingpeople.commons.entities.Effort;
import poolingpeople.commons.entities.PoolingpeopleEntity;
import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.*;
import poolingpeople.persistence.neo4j.exceptions.*;

public class PersistedComment extends AbstractPersistedModel<PersistedComment> implements Comment
{

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.EFFORT;
	
	/*
	 * Used to know if the model is already built and consistent.
	 */
	
	
	public PersistedComment(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	/*
	 * @todo: in the system defaults must be loaded
	 */
	public PersistedComment(NeoManager manager, Effort effort) throws NodeExistsException {
	}

	public PersistedComment(NeoManager manager, String id) throws NotUniqueException,
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
	protected void initializeVariables() {
		if (getStringProperty(NodePropertyName.COMMENT) == null) {
			setProperty(NodePropertyName.COMMENT, "");
		}
	}

	@Override
	public User getOwner() {
		PersistedUser owner = getEndNode(Relations.COMMENTED, PersistedUser.class);
		
		if ( owner == null ){
			throw new ConsistenceException("Message without owner found");
		}
		
		return owner;
	}

	@Override
	public PoolingpeopleEntity getCommentedEntity() {
		AbstractPersistedModel<?> object = getEndNode(Relations.ABOUT_OBJECT);
		return (PoolingpeopleEntity) object;
	}
	
	@Override
	public List<Comment> getObjectComments(){
		return null;
	}

	@Override
	public List<ChangeLog> getChangeLogList() {
		return null;
	}
}




















