package poolingpeople.webapplication.business.boundary;

import static org.junit.Assert.*;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.lucene.util.IOUtils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;
import org.neo4j.test.TestGraphDatabaseFactory;
import org.skyscreamer.jsonassert.JSONAssert;

import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.neo4j.NeoManagerHelper;

public class TaskBoundaryTest {

	TaskBoundary target;
	private GraphDatabaseService graphDb;
	private Transaction currentTx;
	NeoManagerHelper helper;
	EntityFactory entityFactory;

	@Before
	public void setUp() throws Exception {
		graphDb = new TestGraphDatabaseFactory().newImpermanentDatabase();
		helper = new NeoManagerHelper(graphDb);
		entityFactory = new EntityFactory();
		target = new TaskBoundary(entityFactory ,new DTOConverter());
		currentTx = graphDb.beginTx();
	}

	@After
	public void tearDown() throws Exception {
		currentTx.close();
		graphDb.shutdown();
	}
	
	@Test
	public void testGetTask() {
//		Response response = target.getTask("28b6e993-0200-458f-a736-239a8e7f1d72");
//		assertEquals(response.getStatus(), Status.OK);
		String expected = loadJson("individualTask-gettest.json");
		System.out.println(expected);
//		JSONAssert.assertEquals(expected, actual, strict);
	}

	@Test
	public void testGetAllTask() {
		fail("Not yet implemented");
	}

	@Test
	public void testSaveTask() {
		fail("Not yet implemented");
	}

	@Test
	public void testUpdateTask() {
		fail("Not yet implemented");
	}

	@Test
	public void testFakeTask() {
		fail("Not yet implemented");
	}
	
	private String loadJson(String jsonFile) {
		ClassLoader classLoader = Thread.currentThread().getContextClassLoader();
		InputStream input = classLoader.getResourceAsStream(this.getClass().getPackage().getName().replace(".", "/") + "/" + jsonFile);
		return FileUtils.
	}
	
	

}
