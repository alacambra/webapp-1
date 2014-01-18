package poolingpeople.webapplication.business.task.boundary;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.codehaus.jackson.map.ObjectMapper;
import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.CdiRunner;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;

import org.junit.runner.RunWith;

import poolingpeople.webapplication.business.boundary.CatchWebExceptionInterceptor;
import poolingpeople.webapplication.business.boundary.ObjectMapperProducer;
import poolingpeople.webapplication.business.neo4j.TransactionInterceptor;
import poolingpeople.webapplication.business.utils.cdi.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.utils.configuration.boundary.ConfigurationProducer;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;
import poolingpeople.webapplication.business.utils.helpers.RestObjectsHelper;

@RunWith(CdiRunner.class)
@AdditionalClasses({
	ObjectMapperProducer.class, 
	GraphDatabaseServiceProducer.class, 
	TransactionInterceptor.class, 
	CatchWebExceptionInterceptor.class,
	ConfigurationProducer.class
})
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

		List<Map<Object, Object>> expected = restObjectsHelper.createTaskListFromTaskFile("task-create-request.json", 3);
		Response allTask = target.getAllTask();
		assertEquals(Response.Status.OK, allTask.getStatusInfo());

		@SuppressWarnings("unchecked")
		List<Map<Object, Object>> actuall = mapper.readValue((String)allTask.getEntity(), List.class);
		assertTrue(restObjectsHelper.mapsListAreEquals(expected, actuall));

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

		String title = "title under test";
		Map<String,String> createdTaskdata = restObjectsHelper.insertTaskFromFile("task-create-request.json");
		createdTaskdata.put("title", title);
		String json = restObjectsHelper.convertMapToJson(createdTaskdata);
		Response r = target.updateTask(createdTaskdata.get("id"), json);
		assertEquals(Status.OK.getStatusCode(), r.getStatus());
		Map<String,String> receivedTaskdata = restObjectsHelper.convertJsonToMap((String)r.getEntity());
		assertTrue(restObjectsHelper.mapsAreEquals(receivedTaskdata, createdTaskdata));


	}

	@Test()
	public void testDeleteTask() throws Exception {
		Map<String,String> createdTaskdata = restObjectsHelper.insertTaskFromFile("task-create-request.json");
		Response r = target.deleteTask(createdTaskdata.get("id"));
		assertEquals(Status.NO_CONTENT.getStatusCode(), r.getStatus());
		try{
			target.getTaskById(createdTaskdata.get("id"));
		}catch(WebApplicationException e){
			assertEquals(Status.NOT_FOUND.getStatusCode(), e.getResponse().getStatus());
		}
	}









































































}
