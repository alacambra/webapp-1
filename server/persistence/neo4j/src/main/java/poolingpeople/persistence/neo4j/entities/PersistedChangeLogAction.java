package poolingpeople.persistence.neo4j.entities;

import java.util.List;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.exceptions.RootApplicationException;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;

public class PersistedChangeLogAction extends AbstractPersistedModel<PersistedChangeLogAction> implements ChangeLogAction {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.CHANGELOG_ACTION;

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
	public void setChangedAttribute(String attribute) {
		setProperty(NodePropertyName.CHANGED_PROPERTY, attribute);
	}

	@Override
	public void setChangeMessage(String message) {
		setProperty(NodePropertyName.BACKLOG_MESSAGE, message);
	}

	@Override
	public List<ChangeLog> getChangeLogList() {
		throw new RootApplicationException("A changeLogAction has no chnagelog list");
	}

}
