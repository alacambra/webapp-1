package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.BacklogAction;
import poolingpeople.commons.entities.Backlog;
import poolingpeople.commons.entities.BacklogSubject;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;
import poolingpeople.persistence.neo4j.Relations;

public class PersistedBacklog extends AbstractPersistedModel<Backlog> implements Backlog {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.BACKLOG;
	public PersistedBacklog(NeoManager manager, Node node,
			PoolingpeopleObjectType objectType) {
		super(manager, node, NODE_TYPE);
	}

	@Override
	protected void initializeVariables() {
	}

	@Override
	public BacklogSubject getSubject() {
		return getRelatedNode(Relations.HAS_SUBJECT , PersistedBacklogSubject.class);
	}

	@Override
	public BacklogAction getAction() {
		return getRelatedNode(Relations.HAS_ACTION, PersistedBacklogAction.class);
	}

	@Override
	public Long getDate() {
		return getLongProperty(NodePropertyName.TIME);
	}

}
