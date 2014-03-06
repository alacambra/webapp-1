package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.Subject;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;
import poolingpeople.persistence.neo4j.Relations;
import poolingpeople.persistence.neo4j.exceptions.RelationAlreadyExistsException;

public class PersistedChangeLog extends AbstractPersistedModel<ChangeLog> implements ChangeLog {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.CHANGELOG;
	public PersistedChangeLog(NeoManager manager, Node node,
			PoolingpeopleObjectType objectType) {
		super(manager, node, NODE_TYPE);
	}

	@Override
	protected void initializeVariables() {
	}

	@Override
	public Subject getSubject() {
		return getRelatedNode(Relations.HAS_SUBJECT , PersistedUser.class);
	}

	@Override
	public ChangeLogAction getAction() {
		return getRelatedNode(Relations.HAS_ACTION, PersistedChangeLogAction.class);
	}

	@Override
	public Long getDate() {
		return getLongProperty(NodePropertyName.TIME);
	}

	@Override
	public void setId(String id) {
		setProperty(NodePropertyName.ID, id);
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
