package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.BacklogSubject;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;

public class PersistedBacklogSubject extends AbstractPersistedModel<PersistedBacklogSubject> implements BacklogSubject {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.BACKLOG_SUBJECT;
	public PersistedBacklogSubject(NeoManager manager, Node node,
			PoolingpeopleObjectType objectType) {
		super(manager, node, NODE_TYPE);
	}

	@Override
	protected void initializeVariables() {
	}

	@Override
	public String getFirstName() {
		return getStringProperty(NodePropertyName.FIRSTNAME);
	}

	@Override
	public String getLastName() {
		return getStringProperty(NodePropertyName.LASTNAME);
	}

}
