package poolingpeople.webapplication.business.user.entity;

import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.index.IndexHits;

import poolingpeople.webapplication.business.boundary.RootApplicationException;
import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.UserIndexContainer;
import poolingpeople.webapplication.business.neo4j.exceptions.ConsistenceException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;

public class PersistedUser extends PersistedModel implements User {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.USER;

	public PersistedUser(NeoManager manager, String id) throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedUser(NeoManager manager, String email, String password) throws NodeExistsException {
		super(manager, NODE_TYPE);
		manager.addToIndex(underlyingNode, new UserIndexContainer(email, password));
	}

	public PersistedUser() throws NodeExistsException {
		super(NODE_TYPE);
	}

	public PersistedUser(NeoManager manager) throws NodeExistsException {
		super(NODE_TYPE);
		this.manager = manager;
	}

	public PersistedUser(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	public void loadByCredentials(String email, String password) {

		if (underlyingNode != null) {
			throw new RootApplicationException("Node already loaded");
		}

		IndexHits<Node> indexHits = manager.getNodes(new UserIndexContainer(email, password));

		if ( indexHits.size() == 0 ) {
			throw new NodeNotFoundException();
		}

		if ( indexHits.size() > 1 ) {
			throw new RootApplicationException("Too many nodes with the same email/passwords");
		}

		underlyingNode = indexHits.getSingle();

		if (underlyingNode == null){
			throw new ConsistenceException("Index found but not its entity."); 
		}
	}

	@Override
	public String getId() {
		return manager.getStringProperty(underlyingNode, NodesPropertiesNames.ID.name());
	}

	@Override
	public String getFirstName() {
		return manager.getStringProperty(underlyingNode, NodesPropertiesNames.FIRSTNAME.name());
	}

	@Override
	public void setFirstName(String firstName) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.FIRSTNAME.name(), firstName);

	}

	@Override
	public String getEmail() {
		return manager.getStringProperty(underlyingNode, NodesPropertiesNames.EMAIL.name());
	}

	@Override
	public void setEmail(String title) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.EMAIL.name(),
				title);
	}

	@Override
	public String getLastName() {
		return manager.getStringProperty(underlyingNode,
				NodesPropertiesNames.LASTNAME.name());
	}

	@Override
	public void setLastName(String description) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.LASTNAME.name(), description);
	}

	@Override
	public String getPassword() {
		return manager.getStringProperty(underlyingNode,
				NodesPropertiesNames.PASSWORD.name());
	}

	@Override
	public void setPassword(String password) {
		manager.setProperty(underlyingNode,
				NodesPropertiesNames.PASSWORD.name(), password);
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedUser
				&& ((PersistedUser) obj).getNode().equals(underlyingNode);
	}

	public void addSubtask(User child) {
		Relations.IS_SUBPROJECT_OF.relationIsPossibleOrException(NODE_TYPE,
				((PersistedUser) child).getNodeType());
		manager.createRelationshipTo(underlyingNode,
				((PersistedUser) child).getNode(), Relations.IS_SUBPROJECT_OF);
	}

}
