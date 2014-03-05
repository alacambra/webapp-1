package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.ChangeLogSubject;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;
import poolingpeople.persistence.neo4j.Relations;

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
	public ChangeLogSubject getSubject() {
		return getRelatedNode(Relations.HAS_SUBJECT , PersistedChangeLogSubject.class);
	}

	@Override
	public ChangeLogAction getAction() {
		return getRelatedNode(Relations.HAS_ACTION, PersistedChangeLogAction.class);
	}

	@Override
	public Long getDate() {
		return getLongProperty(NodePropertyName.TIME);
	}

}
