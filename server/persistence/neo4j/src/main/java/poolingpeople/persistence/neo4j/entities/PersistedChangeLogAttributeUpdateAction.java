package poolingpeople.persistence.neo4j.entities;

import javax.inject.Inject;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.entities.ChangeLogAttributeUpdate;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;

public class PersistedChangeLogAttributeUpdateAction implements ChangeLogAttributeUpdate {
	private Node changeLogNode;
	@Inject NeoManager manager; //geht net
	private String changedAtributeName;
	private String code;
	private String oldValue;
	private String newValue;
	private String id;
	
	@Override
	public String getCode() {
		return code;
	}

	@Override
	public String getChangedAttributeName() {
		return changedAtributeName;
	}

	@Override
	public String getOldValue() {
		return oldValue;
	}

	@Override
	public String getNewValue() {
		return newValue;
	}

	@Override
	public String getId() {
		return id;
	}

	@Override
	public ChangeLogAction loadChangeLogActionFromNode(Node node) {
		changeLogNode = node;
		this.changedAtributeName = manager.getStringProperty(changeLogNode, NodePropertyName.CHANGED_PROPERTY.name());
		this.code = manager.getStringProperty(changeLogNode, NodePropertyName.CHANGELOG_ACTION_CODE.name());
		this.oldValue = manager.getStringProperty(changeLogNode, NodePropertyName.OLD_VALUE.name());
		this.newValue = manager.getStringProperty(changeLogNode, NodePropertyName.NEW_VALUE.name());
		this.id = manager.getStringProperty(changeLogNode, NodePropertyName.ID.name());
		return this;
	}

}
