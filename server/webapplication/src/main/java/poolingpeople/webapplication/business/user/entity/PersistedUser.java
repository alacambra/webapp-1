package poolingpeople.webapplication.business.user.entity;

import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.index.IndexHits;

import poolingpeople.webapplication.business.boundary.RootApplicationException;
import poolingpeople.webapplication.business.entity.AbstractPersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodePropertyName;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.UserIndexContainer;
import poolingpeople.webapplication.business.neo4j.exceptions.ConsistenceException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;

public class PersistedUser extends AbstractPersistedModel<User> implements User {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.USER;

	public PersistedUser(NeoManager manager, String id) throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedUser(NeoManager manager, String email, String password, User user) throws NodeExistsException {
		super(manager, NODE_TYPE, user);
		isCreated = false;
		
		IndexHits<Node> indexHits = manager.getNodes(new UserIndexContainer(email, password));

		if ( indexHits.size() != 0 ) {
			throw new NotUniqueException("Too many nodes with the same email/passwords");
		}
		
		manager.addToIndex(underlyingNode, new UserIndexContainer(email, password));
		setLoginEmail(email);
		setPassword(password);
		
		isCreated = true;
		
	}

//	public PersistedUser() throws NodeExistsException {
//		super(NODE_TYPE);
//	}

//	public PersistedUser(NeoManager manager) throws NodeExistsException {
//		super(manager, NODE_TYPE);
//		this.manager = manager;
//	}
	
	public PersistedUser(NeoManager manager, String email, String password){
		super(manager, NODE_TYPE);
		loadByCredentials(email, password);
	}

	public PersistedUser(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	private void loadByCredentials(String email, String password) {

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
		return manager.getStringProperty(underlyingNode, NodePropertyName.ID.name());
	}

	@Override
	public String getFirstName() {
		return manager.getStringProperty(underlyingNode, NodePropertyName.FIRSTNAME.name());
	}

	@Override
	public void setFirstName(String firstName) {
		manager.setProperty(underlyingNode, NodePropertyName.FIRSTNAME.name(), firstName);

	}

	@Override
	public String getEmail() {
		return manager.getStringProperty(underlyingNode, NodePropertyName.EMAIL.name());
	}

	private void setLoginEmail(String email) {
		manager.setProperty(underlyingNode, NodePropertyName.EMAIL.name(), email);
	}

	@Override
	public String getLastName() {
		return manager.getStringProperty(underlyingNode,
				NodePropertyName.LASTNAME.name());
	}

	@Override
	public void setLastName(String description) {
		manager.setProperty(underlyingNode,
				NodePropertyName.LASTNAME.name(), description);
	}

	@Override
	public String getPassword() {
		return manager.getStringProperty(underlyingNode,
				NodePropertyName.PASSWORD.name());
	}

	@Override
	public void setPassword(String password) {
		manager.setProperty(underlyingNode,
				NodePropertyName.PASSWORD.name(), password);
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
	
	@Override
	public Long getBirthDate() {
		return manager.getLongProperty(underlyingNode, NodePropertyName.BIRTHDATE.name());
	}

	@Override
	public void setBirthDate(Long birthDate) {
		manager.setProperty(underlyingNode, NodePropertyName.BIRTHDATE.name(), birthDate);
	}

	@Override
	protected void initializeVariables() {
		// TODO Auto-generated method stub
		
	}
}























































