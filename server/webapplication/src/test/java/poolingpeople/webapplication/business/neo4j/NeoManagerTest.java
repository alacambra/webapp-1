package poolingpeople.webapplication.business.neo4j;

import static org.junit.Assert.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Relationship;
import org.neo4j.graphdb.RelationshipType;
import org.neo4j.graphdb.Transaction;
import org.neo4j.graphdb.index.IndexHits;
import org.neo4j.test.TestGraphDatabaseFactory;

public class NeoManagerTest {

	NeoManager target = new NeoManager();
	private GraphDatabaseService graphDb;
	private Transaction currentTx;
	NeoManagerHelper helper;

	private String key = "key";
	private String value = "value";

	@Before
	public void setUp() throws Exception {
		graphDb = new TestGraphDatabaseFactory().newImpermanentDatabase();
		helper = new NeoManagerHelper(graphDb);
		target = new NeoManager(graphDb); 
		currentTx = graphDb.beginTx();
	}

	@After
	public void tearDown() throws Exception {
		currentTx.close();
		graphDb.shutdown();
	}

	@Test
	public void testNodeExistTrue() throws NodeExistsException {
		UUIDIndexContainer container = new UUIDIndexContainer(UUID.randomUUID().toString());
		helper.addNode(container);
		assertTrue(target.uniqueNodeExist(container));
	}

	@Test
	public void testNodeExistFalse() throws NodeExistsException {
		UUIDIndexContainer container = new UUIDIndexContainer(UUID.randomUUID().toString());
		helper.addNode(new UUIDIndexContainer(UUID.randomUUID().toString()));
		assertFalse(target.uniqueNodeExist(container));
	}

	@Test(expected = NodeExistsException.class)
	public void testNodeExistException() throws NodeExistsException {
		UUIDIndexContainer container = new UUIDIndexContainer(UUID.randomUUID().toString());
		helper.addNode(container);
		helper.addNode(container);
		target.uniqueNodeExist(container);
	}

	@Test
	public void testGetUniqueNode() throws NotUniqueException, NodeNotFoundException {
		UUIDIndexContainer container = new UUIDIndexContainer(UUID.randomUUID().toString());
		helper.addNode(container);
		assertNotNull(target.getUniqueNode(container));
	}

	@Test
	public void testGetNodes() {

		TypeIndexContainer indexContainer = new TypeIndexContainer(PoolingpeopleObjectType.TASK);
		helper.addNode(indexContainer);
		helper.addNode(indexContainer);
		helper.addNode(indexContainer);

		IndexHits<Node> hits = target.getNodes(indexContainer);
		assertEquals(3, hits.size());

		hits = target.getNodes(new TypeIndexContainer(PoolingpeopleObjectType.USER));
		assertEquals(0, hits.size());
	}

	@Test
	public void testCreateNode() throws NotUniqueException, NodeExistsException, NodeNotFoundException {
		UUIDIndexContainer container = new UUIDIndexContainer(UUID.randomUUID().toString());
		HashMap<String, Object> properties = new HashMap<>();
		properties.put("key", "value");
		target.createNode(properties, container, PoolingpeopleObjectType.TASK);
		Node n = target.getUniqueNode(container);
		assertNotNull(n);
		assertEquals(n.getProperty(key), value);

	}

	@Test(expected = NodeExistsException.class)
	public void testCreateNodeException() throws NodeExistsException {
		UUIDIndexContainer container = new UUIDIndexContainer(UUID.randomUUID().toString());
		target.createNode(new HashMap<String,Object>(), container, PoolingpeopleObjectType.TASK);
		target.createNode(new HashMap<String,Object>(), container, PoolingpeopleObjectType.TASK);
	}

	@Test
	public void testAddToIndex() {

		IndexContainer indexContainer = new UUIDIndexContainer();

		Node n = helper.addNode(indexContainer);
		target.addToIndex(n, indexContainer);
		IndexHits<Node> hits = graphDb.index().forNodes(indexContainer.getType()).get(indexContainer.getKey(), indexContainer.getValue());
		assertEquals(1, hits.size());
	}

	@Test
	public void testCreateRelationshipToNodeNodeRelationshipTypeMapOfStringObject() {

		Node from = helper.addNode();
		Node to = helper.addNode();

		RelationshipType relationshipType = new RelationshipType() {

			@Override
			public String name() {
				return "TEST";
			}
		};

		Map<String, Object> properties = new HashMap<String, Object>();
		properties.put(key, value);
		Relationship r = target.createRelationshipTo(from, to, relationshipType, properties);

		assertEquals(from, r.getStartNode());
		assertEquals(to, r.getEndNode());
		assertEquals(r.getProperty(key), value);

		r = target.createRelationshipTo(from, to, relationshipType);

		assertEquals(from, r.getStartNode());
		assertEquals(to, r.getEndNode());

	}

	@Test
	public void testGetProperty() {
		Node n = helper.addNode();
		n.setProperty(key, value);
		assertEquals(value, target.getProperty(n, key));
	}

	@Test
	public void testGetStringProperty() {
		Node n = helper.addNode();
		n.setProperty(key, value);
		assertEquals(value, target.getStringProperty(n, key));
	}

	@Test
	public void testGetIntegerProperty() {
		Node n = helper.addNode();
		n.setProperty(key, 1);
		assertEquals((Integer)1, target.getIntegerProperty(n, key));
	}

	@Test
	public void testSetProperty() {
		Node n = helper.addNode();
		target.setProperty(n, key, value);
		assertEquals(value, n.getProperty(key));
	}

	@Test
	public void testGetRelatedNodeNodeRelationshipType() {

		Node to = helper.addNode();
		Node from = helper.addNode();

		RelationshipType relationshipType = new RelationshipType() {

			@Override
			public String name() {
				return "TEST";
			}
		};

		from.createRelationshipTo(to, relationshipType);

		Node n = target.getRelatedNode(to, relationshipType);
		assertEquals(from, n);

		n = target.getRelatedNode(from, relationshipType);
		assertEquals(to, n);

	}

	@Test
	public void testGetRelatedNodeNodeRelationshipTypeDirection() {

		Node to = helper.addNode();
		Node from = helper.addNode();

		RelationshipType relationshipType = new RelationshipType() {

			@Override
			public String name() {
				return "TEST";
			}
		};

		from.createRelationshipTo(to, relationshipType);

		Node n = target.getRelatedNode(to, relationshipType, Direction.OUTGOING);
		assertNull(n);

		n = target.getRelatedNode(to, relationshipType, Direction.INCOMING);
		assertEquals(from, n);

		n = target.getRelatedNode(to, relationshipType, Direction.BOTH);
		assertEquals(from, n);

		n = target.getRelatedNode(from, relationshipType, Direction.INCOMING);
		assertNull(n);

		n = target.getRelatedNode(from, relationshipType, Direction.OUTGOING);
		assertEquals(to, n);

		n = target.getRelatedNode(from, relationshipType, Direction.BOTH);
		assertEquals(to, n);
	}

	@Test(expected = RuntimeException.class)
	public void testGetRelatedNodeNodeRelationshipTypeException() {

		Node to = helper.addNode();
		Node error = helper.addNode();
		Node from = helper.addNode();

		RelationshipType relationshipType = new RelationshipType() {

			@Override
			public String name() {
				return "TEST";
			}
		};

		from.createRelationshipTo(to, relationshipType);
		from.createRelationshipTo(error, relationshipType);

		target.getRelatedNode(from, relationshipType);
	}

	@Test
	public void testRunCypherQuery() {

	}

	@Test
	public void testGetRelatedNodesNodeRelationshipType() {
		Node from = helper.addNode();
		Node middle = helper.addNode();
		Node to = helper.addNode();

		RelationshipType relationshipType = new RelationshipType() {

			@Override
			public String name() {
				return "TEST";
			}
		};

		from.createRelationshipTo(middle, relationshipType);
		middle.createRelationshipTo(to, relationshipType);

		Collection<Node> n = target.getRelatedNodes(to, relationshipType);
		assertEquals(1, n.size());

		n = target.getRelatedNodes(from, relationshipType);
		assertEquals(1, n.size());

		n = target.getRelatedNodes(middle, relationshipType);
		assertEquals(2, n.size());
	}

	@Test
	public void testGetRelatedNodesNodeRelationshipTypeDirection() {
		Node from = helper.addNode();
		Node middle = helper.addNode();
		Node to = helper.addNode();


		RelationshipType relationshipType = new RelationshipType() {

			@Override
			public String name() {
				return "TEST";
			}
		};

		from.createRelationshipTo(middle, relationshipType);
		middle.createRelationshipTo(to, relationshipType);

		Collection<Node> n = target.getRelatedNodes(to, relationshipType, Direction.OUTGOING);
		assertEquals(0, n.size());

		n = target.getRelatedNodes(to, relationshipType, Direction.INCOMING);
		assertEquals(middle, n.iterator().next());

		n = target.getRelatedNodes(to, relationshipType, Direction.BOTH);
		assertEquals(middle, n.iterator().next());

		n = target.getRelatedNodes(from, relationshipType, Direction.INCOMING);
		assertEquals(0, n.size());

		n = target.getRelatedNodes(from, relationshipType, Direction.OUTGOING);
		assertEquals(middle, n.iterator().next());

		n = target.getRelatedNodes(from, relationshipType, Direction.BOTH);
		assertEquals(middle, n.iterator().next());

		n = target.getRelatedNodes(middle, relationshipType, Direction.INCOMING);
		assertEquals(from, n.iterator().next());

		n = target.getRelatedNodes(middle, relationshipType, Direction.OUTGOING);
		assertEquals(to, n.iterator().next());

		n = target.getRelatedNodes(middle, relationshipType, Direction.BOTH);
		assertEquals(2, n.size());
	}

	@Test
	public void testRemoveRelation() {
		Node to = helper.addNode();
		Node from = helper.addNode();

		RelationshipType relationshipType = new RelationshipType() {

			@Override
			public String name() {
				return "TEST";
			}
		};

		from.createRelationshipTo(to, relationshipType);
		assertTrue(from.getRelationships().iterator().hasNext());
		target.removeRelation(from, to, relationshipType);
		assertFalse(from.getRelationships().iterator().hasNext());
	}

//	@Test
//	public void testRemoveRelations() {
//		Node to = helper.addNode();
//		Node from = helper.addNode();
//
//		RelationshipType relationshipType = new RelationshipType() {
//
//			@Override
//			public String name() {
//				return "TEST";
//			}
//		};
//
//		from.createRelationshipTo(to, relationshipType);
//		to.createRelationshipTo(from, relationshipType);
//		
//		assertEquals(2, Lists.newArrayList(from.getRelationships().iterator()).size());
//		target.removeRelations((Relationship[]) Lists.newArrayList(from.getRelationships().iterator()).toArray());
//		assertFalse(from.getRelationships().iterator().hasNext());
//	}

	@Test
	public void testHasProperty() {
		Node n = helper.addNode();
		n.setProperty(key, true);
		assertTrue(target.hasProperty(n, key));
	}

	@Test
	public void testRemoveNode() {
		
		UUIDIndexContainer container = new UUIDIndexContainer();
		Node n = helper.addNode(container);
		assertTrue(graphDb.index().forNodes(container.getType()).get(container.getKey(), container.getValue()).hasNext());
		target.removeNode(n);
		assertFalse(graphDb.index().forNodes(container.getKey()).get(container.getKey(), container.getValue()).hasNext());
	}

	@Test
	public void testGetBooleanProperty() {
		Node n = helper.addNode();
		n.setProperty(key, true);
		assertTrue(target.getBooleanProperty(n, key));
	}

	@Test
	public void testGetLongProperty() {
		Node n = helper.addNode();
		n.setProperty(key, 1L);
		assertEquals((Long)1L, target.getLongProperty(n, key));
	}

	@Test
	public void testGetPersistedObjects() {

	}

}

