package poolingpeople.webapplication.business.task.boundary;

import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.map.ObjectMapper;
import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.CdiRunner;
import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;

import static org.junit.Assert.*;

import org.junit.runner.RunWith;

import poolingpeople.webapplication.business.boundary.ObjectMapperProducer;
import poolingpeople.webapplication.business.neo4j.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.neo4j.TransactionInterceptor;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;
import poolingpeople.webapplication.business.utils.helpers.RestObjectsHelper;

@RunWith(CdiRunner.class)
@AdditionalClasses({ObjectMapperProducer.class, GraphDatabaseServiceProducer.class, TransactionInterceptor.class})
public class TaskBoundaryTest {

	@Inject
	TaskBoundary target;

	@Inject
	FileLoader fileLoader;

	@Inject
	RestObjectsHelper restObjectsHelper;
	
	ObjectMapper mapper = new ObjectMapper();
	
	@Before
	public void setUp() {
	}

	@After
	public void tearDown() {
	}

	@Test
	public void testGetTaskById_new() throws Exception {
		
		Map<String,String> createdTaskdata = restObjectsHelper.insertTaskFromFile("task-create-request.json");
		Map<String,String> expectedTaskdata = restObjectsHelper.convertJsonFileToMap("task-create-response.json");
		expectedTaskdata.put("id", createdTaskdata.get("id"));
		
		Response response = target.getTaskById(createdTaskdata.get("id"));
		assertEquals(Response.Status.OK, response.getStatusInfo());
		Map<String,String> receivedTaskdata = restObjectsHelper.convertJsonToMap((String)response.getEntity());
		
		assertTrue(restObjectsHelper.mapsAreEquals(expectedTaskdata, receivedTaskdata));

	}

	@Test
	public void testGetAllTask() throws Exception {
		
		final String createTask = "{\"title\":\"test\"}";
		target.saveTask(createTask);
		Response allTask = target.getAllTask();
		assertEquals(Response.Status.OK, allTask.getStatusInfo());
		assertNotNull(allTask.getEntity());
		
	}

	@Test
	public void testSaveTask() throws Exception {
		
		Map<String,String> expectedTaskdata = restObjectsHelper.convertJsonFileToMap("task-create-response.json");
		
		Response response = target.saveTask(FileLoader.getText("task-create-request.json"));
		assertEquals(Response.Status.OK, response.getStatusInfo());
		Map<String,String> actuall = restObjectsHelper.convertJsonToMap((String) response.getEntity());
		expectedTaskdata.put("id", actuall.get("id"));
		assertTrue(restObjectsHelper.mapsAreEquals(expectedTaskdata, actuall));
		
	}

	@Test 
	public void testUpdateTask() throws Exception {
	}

	@Test
	public void testDeleteTask() throws Exception {

	}
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	

	
	
	
	
	
	
	
	
	
	
	
	
	
	

}
