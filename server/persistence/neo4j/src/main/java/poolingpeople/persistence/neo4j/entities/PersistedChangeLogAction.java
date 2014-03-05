package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;

public class PersistedChangeLogAction extends AbstractPersistedModel<ChangeLogAction> implements ChangeLogAction {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.CHANGELOG_ACTION;
	public PersistedChangeLogAction(NeoManager manager, Node node,
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

	@Override
	public void setId(String id) {
		setProperty(NodePropertyName.ID, id);
	}

	@Override
	public void setChangedAttribute(String attribute) {
		setProperty(NodePropertyName.CHANGED_PROPERTY, attribute);
	}

	@Override
	public void setChangeMessage(String message) {
		setProperty(NodePropertyName.CHANGED_PROPERTY, message);
	}

}
