package poolingpeople.webapplication.business.entity;

import java.lang.reflect.Method;
import java.util.AbstractCollection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.IndexContainer;
import poolingpeople.webapplication.business.neo4j.NodePropertyName;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.UUIDIndexContainer;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationAlreadyExistsException;

public abstract class PersistedModel<T>{

	protected Node underlyingNode;
	protected NeoManager manager;
	protected Logger logger = Logger.getLogger(this.getClass());
	protected boolean isCreated = true;
	protected Set<IndexContainer> indexContainers;

	private final PoolingpeopleObjectType NODE_TYPE;


	public PersistedModel(NeoManager manager, String id, PoolingpeopleObjectType objectType)
			throws NotUniqueException, NodeNotFoundException {

		this(objectType);
		this.manager = manager;
		underlyingNode = manager.getUniqueNode(new UUIDIndexContainer(id));

	}

	public PersistedModel(NeoManager manager, PoolingpeopleObjectType objectType, T dtoModel) throws NodeExistsException {
		this(objectType);

		isCreated = false;

		this.manager = manager;
		HashMap<String, Object> props = new HashMap<String, Object>();
		underlyingNode = manager.createNode(props, new UUIDIndexContainer(UUID
				.randomUUID().toString()), NODE_TYPE);

		fromDTOtoPersitedBean(dtoModel);

		isCreated = true;
	}

	protected PersistedModel(PoolingpeopleObjectType objectType) throws NodeExistsException{
		NODE_TYPE = objectType;
	}

	public PersistedModel(NeoManager manager, Node node, PoolingpeopleObjectType objectType) {

		this(objectType);

		String nodeType = manager.getStringProperty(node,
				NodePropertyName.TYPE.name());
		if (!PoolingpeopleObjectType.valueOf(nodeType).equals(NODE_TYPE)) {
			throw new IllegalArgumentException("Node must be of type "
					+ NODE_TYPE + ". " + nodeType + " found.");
		}

		underlyingNode = node;
		this.manager = manager;

	}

	public PoolingpeopleObjectType getNodeType() {
		return NODE_TYPE;
	}

	public Node getNode() {
		return underlyingNode;
	}

	public String getId() {
		return manager.getStringProperty(underlyingNode,
				NodePropertyName.ID.name());
	}

	protected void createRelationTo(Relations relation, PersistedModel<?> to, boolean mustBeUnique) {

		if(mustBeUnique && manager.relationExists(underlyingNode, to.getNode(), relation)) {
			throw new RelationAlreadyExistsException();
		}

		relation.relationIsPossibleOrException(NODE_TYPE, to.getNodeType());
		manager.createRelationshipTo(underlyingNode, to.getNode(), relation);
	}

	public void runDeletePreconditions(){

	}

	private void fromDTOtoPersitedBean(Object dto) {

		Method[] methods = dto.getClass().getMethods();

		for(int i = 0; i < methods.length; i++) {
			Method dtoMethod = methods[i];
			if(dtoMethod.isAnnotationPresent(IgnoreAttribute.class)) {
				continue;
			}

			Method beanMethod = getSetterMethod(dtoMethod.getName(), dtoMethod.getReturnType(), this);

			if(beanMethod == null){
				continue;
			}

			try {

				if ( dtoMethod.invoke(dto) == null )
					continue;

				beanMethod.invoke(this, dtoMethod.invoke(dto));

			} catch (Exception e) {
				throw new RuntimeException("error for method " + dtoMethod.getName() + "|" + beanMethod.getName() + ":" + e.getMessage(), e);
			}

		}
	}

	private Method getSetterMethod(String getterName, Class<?> param, Object target) {

		String setterName = getterName.replaceAll("^get([A-Z][\\w\\d]+)$", "set$1");
		try {
			return setterName.equals(getterName) ? null : target.getClass().getMethod(setterName, param);
		} catch (NoSuchMethodException e) {
			return null;
		} catch (SecurityException e) {
			return null;
		}
	}

	protected void setProperty(NodePropertyName property, Object value) {
		manager.setProperty(underlyingNode, property.name(), value);
	}

	protected Integer getIntegerProperty(NodePropertyName property) {
		return manager.getIntegerProperty(underlyingNode, property.name());
	}

	protected Float getFloatProperty(NodePropertyName property) {
		return manager.getFloatProperty(underlyingNode, property.name());
	}

	protected String getStringProperty(NodePropertyName property) {
		return manager.getStringProperty(underlyingNode, property.name());
	}

	protected Long getLongProperty(NodePropertyName property) {
		return manager.getLongProperty(underlyingNode, property.name());
	}

	protected void createRelationshipTo(PersistedModel<?> to, Relations relation) {
		manager.createRelationshipTo(underlyingNode, to.getNode(), relation);
	}

	protected void createRelationshipFrom(PersistedModel<?> from, Relations relation) {
		manager.createRelationshipTo(from.getNode(), underlyingNode, relation);
	}

	protected void onCreate() {

	}

	protected void onDelete() {

	}

	protected final void finalDelete() {
		onDelete();
	}

	protected <P extends PersistedModel<?>> P getRelatedNode(Relations relation, Class<P> clazz) {

		return manager.wrapNodeInPersistenceWrapper(manager.getRelatedNode(underlyingNode, relation), clazz);

	}

	protected <P extends PersistedModel<?>> P getRelatedNode(Relations relation, Class<P> clazz, Direction direction) {

		return manager.wrapNodeInPersistenceWrapper(manager.getRelatedNode(underlyingNode, relation, direction), clazz);

	}

	protected <P> List<P> getRelatedNodes(Relations relation, Class<P> clazz){
		ArrayList<P> list = new ArrayList<>();
		return (List<P>) manager.getPersistedObjects(manager.getRelatedNodes(underlyingNode, relation), list, clazz);
	}

	protected <IN, IM> List<IN> getRelatedNodes(Relations relation, Class<IM> implementationClass,  Class<IN> interfaceClass){
		return (List<IN>) manager.getPersistedObjects(
				manager.getRelatedNodes(underlyingNode, relation), 
				new ArrayList<IN>(), 
				implementationClass, 
				interfaceClass);
	}

	@Override
	public int hashCode() {
		return underlyingNode.hashCode();
	}




}































































































