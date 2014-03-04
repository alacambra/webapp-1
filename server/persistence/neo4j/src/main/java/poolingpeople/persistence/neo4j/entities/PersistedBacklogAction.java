package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.BacklogAction;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;

public class PersistedBacklogAction extends AbstractPersistedModel<BacklogAction> implements BacklogAction {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.BACKLOG_ACTION;
	public PersistedBacklogAction(NeoManager manager, Node node,
			PoolingpeopleObjectType objectType) {
		super(manager, node, NODE_TYPE);
	}

	@Override
	protected void initializeVariables() {
	}

	@Override
	public String getChangedAttribute() {
		return getStringProperty(NodePropertyName.CHANGED_PROPERTY);
	}

	@Override
	public String getChangeMessage() {
		return getStringProperty(NodePropertyName.BACKLOG_MESSAGE);
	}

}
