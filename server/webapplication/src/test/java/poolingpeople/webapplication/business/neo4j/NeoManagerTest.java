package poolingpeople.webapplication.business.neo4j;

import static org.junit.Assert.*;

import java.util.UUID;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;
import org.neo4j.test.TestGraphDatabaseFactory;

public class NeoManagerTest {

	NeoManager target = new NeoManager();
	private GraphDatabaseService graphDb;
	private Transaction currentTx;
	
	@Before
	public void setUp() throws Exception {
		  graphDb = new TestGraphDatabaseFactory().newImpermanentDatabase();
		  target = new NeoManager(graphDb); 
		  currentTx = graphDb.beginTx();
	}

	@After
	public void tearDown() throws Exception {
		graphDb.shutdown();
	}

	@Test
	public void testNodeExist() {
		IndexContainer container = new UUIDIndexContainer(UUID.randomUUID().toString());
		assertTrue(target.nodeExist(null));
	}

	@Test
	public void testGetUniqueNode() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetNodes() {
		fail("Not yet implemented");
	}

	@Test
	public void testCreateNode() {
		fail("Not yet implemented");
	}

	@Test
	public void testAddToIndex() {
		fail("Not yet implemented");
	}

	@Test
	public void testCreateRelationshipToNodeNodeRelationshipTypeMapOfStringObject() {
		fail("Not yet implemented");
	}

	@Test
	public void testCreateRelationshipToNodeNodeRelationshipType() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetProperty() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetStringProperty() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetIntegerProperty() {
		fail("Not yet implemented");
	}

	@Test
	public void testSetProperty() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetRelatedNodeNodeRelationshipType() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetRelatedNodeNodeRelationshipTypeDirection() {
		fail("Not yet implemented");
	}

	@Test
	public void testRunCypherQuery() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetRelatedNodesNodeRelationshipType() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetRelatedNodesNodeRelationshipTypeDirection() {
		fail("Not yet implemented");
	}

	@Test
	public void testRemoveRelation() {
		fail("Not yet implemented");
	}

	@Test
	public void testRemoveRelations() {
		fail("Not yet implemented");
	}

	@Test
	public void testHasProperty() {
		fail("Not yet implemented");
	}

	@Test
	public void testRemoveNode() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetBooleanProperty() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetGraphDbService() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetLongProperty() {
		fail("Not yet implemented");
	}

	@Test
	public void testGetPersistedObjects() {
		fail("Not yet implemented");
	}

}
