package poolingpeople.webapplication.business.neo4j;

import java.io.File;
import java.lang.reflect.Constructor;
import java.util.AbstractCollection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.inject.Inject;
import javax.inject.Singleton;

import org.apache.log4j.Logger;
import org.neo4j.cypher.javacompat.ExecutionEngine;
import org.neo4j.cypher.javacompat.ExecutionResult;
import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Relationship;
import org.neo4j.graphdb.RelationshipType;
import org.neo4j.graphdb.index.IndexHits;
import org.neo4j.kernel.impl.util.StringLogger;

import poolingpeople.webapplication.business.boundary.RootApplicationException;

@Singleton
public class NeoManager {

	GraphDatabaseService graphDb;
	Logger logger = Logger.getLogger(this.getClass());
	public static final String FOUND = "found";

	protected NeoManager(){}

	@Inject
	public NeoManager(GraphDatabaseService graphDb){
		this.graphDb = graphDb;
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


	public Node getUniqueNode( UUIDIndexContainer indexContainer)  {

		IndexHits<Node> indexHits = this.getNodes(indexContainer);

		if ( indexHits.size() > 1 ) {
			throw new NotUniqueException();
			//			throw new RuntimeException("Node is not unique");	
		} else if ( indexHits.size() == 0 ) {
			throw new NodeNotFoundException();
			//			throw new RuntimeException("Node not found");
		} else {
			Node single = indexHits.getSingle();
			if(single == null) throw new ConsistenceException("Index found but not its entity."); 
			return single;
		}
	}

	public IndexHits<Node> getNodes(IndexContainer indexContainer) {

		IndexHits<Node> indexHits = 
				graphDb.index()
				.forNodes( indexContainer.getType() )
				.get( indexContainer.getKey(), indexContainer.getValue());
		return indexHits;
	}

	public Node createNode(Map<String, Object> properties, UUIDIndexContainer indexContainer, PoolingpeopleObjectType type) 
	{

		Node node = null;

		if (uniqueNodeExist(indexContainer))
			throw new NodeExistsException("Node " + indexContainer.getValue() + " already exists and can not be created again");


		node = graphDb.createNode();

		for (Entry<String, Object> prop : properties.entrySet()) {
			node.setProperty(prop.getKey(), prop.getValue());
		}

		node.setProperty(NodesPropertiesNames.ID.name(), indexContainer.getValue());
		node.setProperty(NodesPropertiesNames.TYPE.name(), type.name());

		addToIndex(node, indexContainer);
		addToIndex(node, new TypeIndexContainer(type));
		return node;
	}


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
			logger.error("property not found", e);
			return null;
		}
		return prop;
	}


	public String getStringProperty(Node node, String key) {
		try {
			return (String) getProperty(node, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.error("property not found", e);
			return "";
		}
	}

	public Integer getIntegerProperty(Node node, String key) {
		try {
			return (Integer) getProperty(node, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.error("property not found", e);
			return 0;
		}
	}

	public Float getFloatProperty(Node node, String key) {
		try {
			return (Float) getProperty(node, key);
		} catch (org.neo4j.graphdb.NotFoundException e) {
			logger.error("property not found", e);
			return 0F;
		}
		catch(java.lang.ClassCastException ex) {
			return 0F;
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


	public ExecutionResult runCypherQuery(String query, Map<String, Object> params) {

		ExecutionResult result = null;
		StringLogger logger = StringLogger.lazyLogger(new File("logs/neo4j.log"));
		ExecutionEngine engine = new ExecutionEngine( graphDb, logger);

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
		if ( direction == null ) {
			throw new RuntimeException("direction can no be null");
		}
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

	public void removeRelation(Node from, Node to, RelationshipType type) {

		Iterable<Relationship> rels = from.getRelationships(type, Direction.OUTGOING);

		for ( Relationship rel : rels ) {
			if ( rel.getEndNode().equals(to)) {
				rel.delete();
				return;
			}
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
		UUIDIndexContainer uuidIndexContainer = new UUIDIndexContainer((String)n.getProperty(NodesPropertiesNames.ID.name()));
		graphDb.index().forNodes( uuidIndexContainer.getType() ).remove(n);
//		n.delete();
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


	public <T> AbstractCollection<T> getPersistedObjects( Collection<Node> nodes, AbstractCollection<T> objects, Class<T> clazz ) {

		for ( Node n : nodes ) {

			try {

				Constructor<T> c = clazz.getConstructor(NeoManager.class, Node.class);
				objects.add(c.newInstance(this, n));

			} catch (Exception e) {
				//				log.error(e);
			}
		}

		return objects;
	}
}
