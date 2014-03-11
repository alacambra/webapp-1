package poolingpeople.persistence.neo4j.entities;

import java.util.List;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.Comment;
import poolingpeople.commons.entities.Effort;
import poolingpeople.commons.entities.PoolingpeopleEntity;
import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;
import poolingpeople.persistence.neo4j.Relations;
import poolingpeople.persistence.neo4j.exceptions.ConsistenceException;
import poolingpeople.persistence.neo4j.exceptions.NodeExistsException;

public class PersistedComment extends AbstractPersistedModel<PersistedComment> implements Comment
{

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.EFFORT;
	
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




















