package poolingpeople.webapplication.business.task.boundary;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.*;
import poolingpeople.webapplication.business.entity.AbstractTest;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;

public class TaskBoundaryTest extends AbstractTest{

	@Inject
	TaskBoundary target;
	
	String taskRequestFile = "tasks/task-create-request.json";
	String taskResponseFile = "tasks/task-create-response.json";

	@Before
	public void setUp() {
	}

	@After
	public void tearDown() {
	}

	@Test
	public void testGetTaskById() throws Exception {

		Map<String,String> createdTaskdata = insertTaskFromFile(taskRequestFile);
		Map<String,String> expectedTaskdata = convertJsonFileToMap(taskResponseFile);
		expectedTaskdata.put("id", createdTaskdata.get("id"));

		Response response = target.getTaskById(createdTaskdata.get("id"));
		assertEquals(Response.Status.OK, response.getStatusInfo());
		Map<String,String> receivedTaskdata = convertJsonToMap((String)response.getEntity());

		assertTrue(mapsAreEquals(expectedTaskdata, receivedTaskdata));

	}

	@Test
	public void testGetAllTask() throws Exception {

		List<Map<Object, Object>> expected = createTaskListFromTaskFile(taskRequestFile, 3);
		Response allTask = target.getAllTask();
		assertEquals(Response.Status.OK, allTask.getStatusInfo());

		@SuppressWarnings("unchecked")
		List<Map<Object, Object>> actual = mapper.readValue((String)allTask.getEntity(), List.class);
		assertTrue(mapsListAreEquals(expected, actual));

	}

	@Test
	public void testSaveTask() throws Exception {

		Map<String,String> expectedTaskdata = convertJsonFileToMap(taskResponseFile);
		Response response = target.saveTask(FileLoader.getText(jsonModelsPath +taskRequestFile));
		assertEquals(Response.Status.OK, response.getStatusInfo());
		Map<String,String> actual = convertJsonToMap((String) response.getEntity());
		expectedTaskdata.put("id", actual.get("id"));
		assertTrue(mapsAreEquals(expectedTaskdata, actual));

	}

	@Test
	public void testUpdateTask() throws Exception {

		String title = "title under test";
		Map<String,String> createdTaskdata = insertTaskFromFile(taskRequestFile);
		createdTaskdata.put("title", title);
		String json = convertMapToJson(createdTaskdata);
		Response r = target.updateTask(createdTaskdata.get("id"), json);
		assertEquals(Status.OK.getStatusCode(), r.getStatus());
		Map<String,String> receivedTaskdata = convertJsonToMap((String)r.getEntity());
		assertTrue(mapsAreEquals(receivedTaskdata, createdTaskdata));

	}

	@Test
	public void testDeleteTask() throws Exception {
		Map<String,String> createdTaskdata = insertTaskFromFile(taskRequestFile);
		Response r = target.deleteTask(createdTaskdata.get("id"));
		assertEquals(Status.NO_CONTENT.getStatusCode(), r.getStatus());
		try{
			target.getTaskById(createdTaskdata.get("id"));
		}catch(WebApplicationException e){
			assertEquals(Status.NOT_FOUND.getStatusCode(), e.getResponse().getStatus());
		}
	}









































































}
