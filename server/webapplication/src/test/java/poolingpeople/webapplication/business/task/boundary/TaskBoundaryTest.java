package poolingpeople.webapplication.business.task.boundary;

import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.CdiRunner;
import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import static org.junit.Assert.*;

import org.junit.runner.RunWith;
import org.skyscreamer.jsonassert.JSONAssert;

import poolingpeople.webapplication.business.boundary.ObjectMapperProducer;
import poolingpeople.webapplication.business.neo4j.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.neo4j.TransactionInterceptor;
import poolingpeople.webapplication.business.utils.cdi.FileLoader;

@RunWith(CdiRunner.class)
@AdditionalClasses({ObjectMapperProducer.class, GraphDatabaseServiceProducer.class, TransactionInterceptor.class})
public class TaskBoundaryTest {

	@Inject
	TaskBoundary cut;

	@Inject
	FileLoader fileLoader;

	ObjectMapper mapper = new ObjectMapper();

	@Before
	public void setUp() {
	}

	@After
	public void tearDown() {
	}

	@Test
	public void testGetTaskById() throws Exception {
		
		String sentTask = fileLoader.getText("task-create-request.json");
		String receivedTask = fileLoader.getText("task-create-response.json");
		
		/*
		 * Save the task and receive the new id
		 */
		Map<String,String> sentTaskdata = mapper.readValue((String)cut.saveTask(sentTask).getEntity(), Map.class);
		
		/*
		 * serialize the expected received task and update its id
		 */
		Map<String,String> expectedTaskdata = mapper.readValue(receivedTask, Map.class);
		expectedTaskdata.put("id", sentTaskdata.get("id"));
		
		/*
		 * test
		 */
		Response response = cut.getTaskById(sentTaskdata.get("id"));
		assertEquals(Response.Status.OK, response.getStatusInfo());
		Map<String,String> receivedTaskdata = mapper.readValue((String)response.getEntity(), Map.class);
		assertTrue(mapsAreEquals(expectedTaskdata, receivedTaskdata));

	}


	@Test
	public void testGetAllTask() throws Exception {
		final String createTask = "{\"title\":\"test\"}";
		cut.saveTask(createTask);
		Response allTask = cut.getAllTask();
		assertEquals(Response.Status.OK, allTask.getStatusInfo());
		assertNotNull(allTask.getEntity());
	}

	@Test
	public void testSaveTask() throws Exception {
		String sentTask = fileLoader.getText("task-create-request.json");
		Response response = cut.saveTask(sentTask);
		assertEquals(Response.Status.OK, response.getStatusInfo());
		assertNotNull(response.getEntity());
	}

	@Test @Ignore
	//cant determine which id should be provided
	public void testUpdateTask() throws Exception {
	}

	@Test @Ignore
	//cant determine which id should be provided
	public void testDeleteTask() throws Exception {

	}
	
	private boolean mapsAreEquals(Map<?,?> m1, Map<?,?> m2) {

		if ( m1.size() != m2.size())
			return false;
		
		for(Object k1 : m1.keySet()) {
			if (!m2.containsKey(k1) || !m1.get(k1).equals(m2.get(k1))){
				return false;
			}
		}
		
		return true;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
