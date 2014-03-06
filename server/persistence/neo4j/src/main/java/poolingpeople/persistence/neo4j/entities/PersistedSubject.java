package poolingpeople.persistence.neo4j.entities;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.Subject;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;

public class PersistedSubject extends AbstractPersistedModel<PersistedSubject> implements Subject {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.SUBJECT;
	public PersistedSubject(NeoManager manager, Node node,
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

	@Override
	public void setFirstName(String firstName) {
		setProperty(NodePropertyName.FIRSTNAME, firstName);
	}

	@Override
	public void setLastName(String lastName) {
		setProperty(NodePropertyName.LASTNAME, lastName);
	}

}
