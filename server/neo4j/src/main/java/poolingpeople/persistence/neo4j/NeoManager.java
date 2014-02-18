package poolingpeople.persistence.neo4j;

import java.lang.reflect.Constructor;
import java.util.AbstractCollection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.ejb.Singleton;
import javax.inject.Inject;

import org.apache.log4j.Logger;
import org.neo4j.cypher.javacompat.ExecutionEngine;
import org.neo4j.cypher.javacompat.ExecutionResult;
import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.DynamicLabel;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Label;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Relationship;
import org.neo4j.graphdb.RelationshipType;
import org.neo4j.graphdb.ResourceIterable;
import org.neo4j.graphdb.ResourceIterator;
import org.neo4j.graphdb.index.IndexHits;
import org.neo4j.helpers.collection.IteratorUtil;
import org.neo4j.helpers.collection.MapUtil;

import poolingpeople.commons.exceptions.RootApplicationException;
import poolingpeople.persistence.neo4j.*;
import poolingpeople.persistence.neo4j.exceptions.*;
@Singleton
public class NeoManager {

	private GraphDatabaseService graphDb;
	private Logger logger = Logger.getLogger(this.getClass());
	public static final String FOUND = "found";
	private ExecutionEngine engine;

	public NeoManager(){}

	@Inject
	public NeoManager(GraphDatabaseService graphDb){
		this.graphDb = graphDb;
		engine = new ExecutionEngine( graphDb );
	}


	public boolean uniqueNodeExist(IndexContainer indexContainer) {

		IndexHits<Node> indexHits = graphDb.index()
				.forNodes( indexContainer.getType() ).get( indexContainer.getKey(), indexContainer.getValue());

		if ( indexHits != null && indexHits.size() == 1 ) {
			indexHits.close();
			return true;
		} else if ( indexHits != null && indexHits.size() > 1 ) {
			throw new NodeExistsException();
		}

		return false;
	}

	@Deprecated
	public Node getUniqueNode(UUIDIndexContainer indexContainer)  {


		IndexHits<Node> indexHits = this.getNodes(indexContainer);

		if ( indexHits.size() > 1 ) {
			throw new NotUniqueException();
		} else if ( indexHits.size() == 0 ) {
			throw new NodeNotFoundException();
		} else {
			Node single = indexHits.getSingle();
			if(single == null) throw new ConsistenceException("Index found but not its entity."); 
			return single;
		}
	}
	
	public Node getUniqueNode( PoolingpeopleObjectType objectType, Object value )  {
		ResourceIterable<Node> nodes = 
				graphDb.findNodesByLabelAndProperty(DynamicLabel.label(objectType.name()), NodePropertyName.ID.name(), value);
		
		ResourceIterator<Node> it = nodes.iterator(); 
		
		if ( it.hasNext() ){
			Node n = it.next();
			if (it .hasNext()){
				throw new NodeNotFoundException();
			}
			
			it.close();
			return n;
			
		} else {
			throw new NodeNotFoundException();
		}
	}

	@Deprecated
	public IndexHits<Node> getNodes(IndexContainer indexContainer) {

		IndexHits<Node> indexHits = 
				graphDb.index()
				.forNodes( indexContainer.getType() )
				.get( indexContainer.getKey(), indexContainer.getValue());
		return indexHits;
	}

	public Collection<Node> getNodes(String label) {

		/**
		 * @todo investigate why is not possible to use it as a parameter
		 */
		//		ExecutionResult result = runCypherQuery("MATCH(n:{label}) RETURN n", genericMap("label", label));
		ExecutionResult result = runCypherQuery("MATCH(n:" + label + ") RETURN n", null);
		Iterator<Node> n_column = result.columnAs("n");
		return IteratorUtil.asCollection(n_column);

	}

	private Map<String, Object> genericMap(Object... objects){
		return MapUtil.genericMap(new HashMap<String, Object>(), objects);
	}

	public Node createNode(Map<String, Object> properties, UUIDIndexContainer indexContainer, PoolingpeopleObjectType poolingpeopleObjectType) 
	{
		Node node = null;

		if (uniqueNodeExist(indexContainer))
			throw new NodeExistsException("Node " + indexContainer.getValue() + " already exists and can not be created again");


		node = graphDb.createNode();

		for (Entry<String, Object> prop : properties.entrySet()) {
			node.setProperty(prop.getKey(), prop.getValue());
		}

		node.setProperty(NodePropertyName.ID.name(), indexContainer.getValue());
		node.setProperty(NodePropertyName.TYPE.name(), poolingpeopleObjectType.name());

		Label label = DynamicLabel.label(indexContainer.getKey());
		node.addLabel(label);
		label = DynamicLabel.label(poolingpeopleObjectType.name());
		node.addLabel(label);

		/*
		 * Legacy support 
		 */
		addToIndex(node, new TypeIndexContainer(poolingpeopleObjectType));
		addToIndex(node, indexContainer);

		return node;
	}

	@Deprecated
	public void addToIndex(Node node, IndexContainer indexContainer) {
		graphDb.index().forNodes(indexContainer.getType()).add(node, indexContainer.getKey(), indexContainer.getValue());
	}


	public Relationship createRelationshipTo(Node from, Node to, RelationshipType relation, Map<String, Object> properties) {

		Relationship rel = null;

		for(Relationship r : from.getRelationships(Direction.OUTGOING, relation)) {

			if (r.getEndNode().getId() == to.getId()) {
				return r;
			}
		}

		rel = from.createRelationshipTo(to, relation);

		for ( Entry<String, Object> prop : properties.entrySet() ) {
			rel.setProperty(prop.getKey(), prop.getValue());
		}

		return rel;

	}


	public Relationship createRelationshipTo(Node from, Node to, RelationshipType relation) {
		return createRelationshipTo(from, to, relation, new HashMap<String, Object>());
	}


	public Object getProperty(Node node, String key) {

		Object prop = null;
		try {
			prop = node.getProperty(key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.warn("property not found:" + key + "( internal id:" + node.getId() + " | uuid:" + getStringProperty(node, "ID") + ")");
			return null;
		}
		return prop;
	}


	public String getStringProperty(Node node, String key) {
		try {
			return (String) getProperty(node, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.warn("property not found:" + key + "( internal id:" + node.getId() + ")");
			return "";
		}
	}

	public Integer getIntegerProperty(Node node, String key) {
		try {
			return (Integer) getProperty(node, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.warn("property not found:" + key + "( internal id:" + node.getId() + ")");
			return 0;
		} catch (ClassCastException e) {
			return Integer.parseInt(getProperty(node, key).toString());
		}
	}

	public Float getFloatProperty(Node node, String key) {
		try {
			return (Float) getProperty(node, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.warn("property not found:" + key + "( internal id:" + node.getId() + ")");
			return 0F;
		} catch (ClassCastException e) {
			return Float.parseFloat(getProperty(node, key).toString());
		}
	}

	public void setProperty(Node node, String key, Object value) {
		node.setProperty(key, value);
	}

	public Node getRelatedNode(Node node, RelationshipType relation) {
		return loadRelatedNodeTo(node, relation, null);
	}

	public Node getRelatedNode(Node node, RelationshipType relation, Direction direction) {

		if ( direction == null ) {
			throw new RuntimeException("Direction can not be null");
		}

		return loadRelatedNodeTo(node, relation, direction);
	}

	private Node loadRelatedNodeTo(Node node, RelationshipType relation, Direction direction) {

		Iterator<Relationship> iterator = null;

		if ( direction == null ) {
			iterator = node.getRelationships(relation).iterator();
		} else {
			iterator = node.getRelationships(relation, direction).iterator();
		}

		if (iterator.hasNext()) {
			Relationship rel = iterator.next();
			if ( iterator.hasNext() ) {
				throw new RuntimeException("More than one relations has been found");
			}
			Node relatedNode = rel.getStartNode().equals(node) ? rel.getEndNode() : rel.getStartNode(); 
			return relatedNode;
		}

		return null;
	}

	public boolean relationExists(Node from, Node to, RelationshipType relation){

		Iterator<Relationship> iterator = from.getRelationships(relation, Direction.OUTGOING).iterator();
		while (iterator.hasNext()) {

			Relationship relationship = iterator.next();

			if (relationship.getStartNode().equals(from) && relationship.getEndNode().equals(to)) {
				return true;
			}
		}

		return false;
	}


	public ExecutionResult runCypherQuery(String query, Map<String, Object> params) {

		ExecutionResult result = null;

		if ( params == null) {
			result = engine.execute( query );
		} else {
			result = engine.execute( query, params );
		}

		return result;
	}

	public Collection<Node> getRelatedNodes(Node node, RelationshipType relation) {
		return loadRelatedNodesTo(node, relation, null);
	}

	public Collection<Node> getRelatedNodes(Node node, RelationshipType relation, Direction direction) {
		//		if ( direction == null ) {
		//			throw new RuntimeException("direction can no be null");
		//		}
		return loadRelatedNodesTo(node, relation, direction);
	}

	private Collection<Node> loadRelatedNodesTo(Node node, RelationshipType relation, Direction direction) {

		Iterable<Relationship> iterator = null;

		if ( direction == null) {
			iterator = node.getRelationships(relation);
		} else {
			iterator = node.getRelationships(relation, direction);
		}

		Collection<Node> relatedNodes = new ArrayList<Node>();

		for ( Relationship rel : iterator ) {
			Node relatedNode = rel.getStartNode().equals(node) ? rel.getEndNode() : rel.getStartNode();
			relatedNodes.add(relatedNode);
		}

		return relatedNodes;
	}

	@Deprecated
	/*
	 * could happens that a pair of node has the same relation several times
	 */
	public void removeRelation(Node from, Node to, RelationshipType type) {

		Iterable<Relationship> rels = from.getRelationships(type, Direction.OUTGOING);

		for ( Relationship rel : rels ) {
			if ( rel.getEndNode().equals(to)) {
				rel.delete();
				return;
			}
		}
	}

	public void removeRelationsFrom(Node from, RelationshipType type) {

		removeRelations(from, type, Direction.OUTGOING);
	}

	public void removeRelationsTo(Node to, RelationshipType type) {

		removeRelations(to, type, Direction.INCOMING);
	}

	public void removeRelations(Node n, RelationshipType type, Direction direction) {

		Iterable<Relationship> rels = n.getRelationships(type, direction);

		for ( Relationship rel : rels ) {
			rel.delete();
		}
	}

	public void removeRelations(Relationship... rels) {
		for ( int i = 0; i < rels.length; i++ ) {
			rels[i].delete();
		}
	}

	public boolean hasProperty(Node node, String key) {
		return node.hasProperty(key);
	}

	/**
	 * Remove also the index in new function
	 * @param n
	 */
	public void removeNode(Node n) {
		UUIDIndexContainer uuidIndexContainer = new UUIDIndexContainer((String)n.getProperty(NodePropertyName.ID.name()));
		graphDb.index().forNodes( uuidIndexContainer.getType() ).remove(n);

		Iterable<Relationship> rels = n.getRelationships();

		for (Relationship r : rels) {
			r.delete();
		}

		n.delete();
	}

	public Boolean getBooleanProperty(Node node, String key) {
		try {
			return (Boolean) getProperty(node, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.error("property not found", e);
			return false;
		}
	}

	public GraphDatabaseService getGraphDbService() {
		return graphDb;
	}

	public Long getLongProperty(Node n, String key) {
		try {
			return (Long) getProperty(n, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.error("property not found", e);
			return 0L;
		}
	}
	
	
	public <T, C extends AbstractCollection<T>> C getPersistedObjects( Collection<Node> nodes, C objects, Class<T> clazz ) {

		for ( Node n : nodes ) {

			try {

				Constructor<T> c = clazz.getConstructor(NeoManager.class, Node.class);
				objects.add(c.newInstance(this, n));

			} catch (Exception e) {
				throw new RootApplicationException(e);
			}
		}

		return objects;
	}

	@SuppressWarnings("unchecked")
	public <IM, IN> AbstractCollection<IN> getPersistedObjects( 
			Collection<Node> nodes, AbstractCollection<IN> objects, Class<IM> implementationClass,  Class<IN> interfaceClass ) {

		if(!interfaceClass.isAssignableFrom(implementationClass)){
			throw new RootApplicationException(implementationClass.getCanonicalName() 
					+ " is not an implementation of " + interfaceClass.getCanonicalName());
		}

		for ( Node n : nodes ) {

			try {

				Constructor<IM> c = implementationClass.getConstructor(NeoManager.class, Node.class);
				objects.add((IN) c.newInstance(this, n));

			} catch (Exception e) {
				throw new RootApplicationException(e);
			}
		}

		return objects;
	}
}
