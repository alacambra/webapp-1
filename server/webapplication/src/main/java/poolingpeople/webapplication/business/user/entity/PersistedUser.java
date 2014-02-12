package poolingpeople.webapplication.business.user.entity;

import java.util.List;

import org.neo4j.graphdb.Direction;
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
import poolingpeople.webapplication.business.task.entity.PersistedTask;
import poolingpeople.webapplication.business.task.entity.Task;

public class PersistedUser extends AbstractPersistedModel<User> implements User {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.USER;

	public PersistedUser(NeoManager manager, String id) throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedUser(NeoManager manager, String email, String password, User user) throws NodeExistsException {
		super(manager, NODE_TYPE, user);
		isCreated = false;
		
//		IndexHits<Node> indexHits = manager.getNodes(new UserIndexContainer(email, password));
//
//		if ( indexHits.size() != 0 ) {
//			throw new NotUniqueException("Too many nodes with the same email/passwords");
//		}
		
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
		
		try {
			underlyingNode = getPersistedObject(new UserIndexContainer(email, password), this.getClass()).getNode();
		} catch (NotUniqueException e){
			throw new NotUniqueException("Two many user with the same email/psw", e);
		}
		
		
	}

	@Override
	public String getId() {
		return getStringProperty(NodePropertyName.ID);
	}

	@Override
	public String getFirstName() {
		return getStringProperty(NodePropertyName.FIRSTNAME);
	}

	@Override
	public void setFirstName(String firstName) {
		setProperty(NodePropertyName.FIRSTNAME, firstName);

	}

	@Override
	public String getEmail() {
		return getStringProperty(NodePropertyName.EMAIL);
	}

	private void setLoginEmail(String email) {
		setProperty(NodePropertyName.EMAIL, email);
	}

	@Override
	public String getLastName() {
		return getStringProperty(NodePropertyName.LASTNAME);
	}

	@Override
	public void setLastName(String description) {
		setProperty(NodePropertyName.LASTNAME, description);
	}

	@Override
	public String getPassword() {
		return getStringProperty(NodePropertyName.PASSWORD);
	}

	@Override
	public void setPassword(String password) {
		setProperty(NodePropertyName.PASSWORD, password);
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedUser
				&& ((PersistedUser) obj).getNode().equals(underlyingNode);
	}

	public void addSubtask(User child) {
		Relations.IS_SUBPROJECT_OF.relationIsPossibleOrException(NODE_TYPE, ((PersistedUser) child).getNodeType());
		createRelationshipTo((PersistedUser) child, Relations.IS_SUBPROJECT_OF);
	}
	
	@Override
	public Long getBirthDate() {
		return getLongProperty(NodePropertyName.BIRTHDATE);
	}

	@Override
	public void setBirthDate(Long birthDate) {
		setProperty(NodePropertyName.BIRTHDATE, birthDate);
	}
	
	@Override
	public List<Task> getTasks() {
		return getRelatedNodes(Relations.DOES, PersistedTask.class, Task.class, Direction.OUTGOING);
	}

	@Override
	protected void initializeVariables() {
		
	}
}























































