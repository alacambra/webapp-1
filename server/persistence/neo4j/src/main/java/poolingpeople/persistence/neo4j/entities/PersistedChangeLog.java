package poolingpeople.persistence.neo4j.entities;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.entities.Subject;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;
import poolingpeople.persistence.neo4j.Relations;
import poolingpeople.persistence.neo4j.exceptions.RelationAlreadyExistsException;

public class PersistedChangeLog extends AbstractPersistedModel<PersistedChangeLog> implements ChangeLog {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.CHANGELOG;

	@Override
	protected void initializeVariables() {
	}

	@Override
	public Subject getSubject() {
		return getEndNode(Relations.HAS_SUBJECT , PersistedUser.class);
	}

	@Override
	public ChangeLogAction getAction() {
		return getEndNode(Relations.HAS_ACTION, PersistedChangeLogAction.class);
	}

	@Override
	public Long getDate() {
		return getLongProperty(NodePropertyName.TIME);
	}

	@Override
	public void setSubject(Subject subject) {
		if(relationExistsTo((AbstractPersistedModel<?>) subject	, Relations.HAS_SUBJECT)) {
			throw new RelationAlreadyExistsException();
		}
		createRelationshipTo((AbstractPersistedModel<?>) subject, Relations.HAS_SUBJECT);
		
		//TODO: UPDATE ALL ?
	}

	@Override
	public void setAction(ChangeLogAction action) {
		if(relationExistsTo((AbstractPersistedModel<?>) action	, Relations.HAS_SUBJECT)) {
			throw new RelationAlreadyExistsException();
		}
		createRelationshipTo((AbstractPersistedModel<?>) action, Relations.HAS_SUBJECT);
		
		//TODO: UPDATE ALL ?

	}

	@Override
	public void setDate(Long date) {
		setProperty(NodePropertyName.DATE, date);
	}

}
