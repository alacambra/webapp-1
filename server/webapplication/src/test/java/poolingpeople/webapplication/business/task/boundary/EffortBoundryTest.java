package poolingpeople.webapplication.business.task.boundary;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.junit.Test;

import poolingpeople.webapplication.business.entity.AbstractTest;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;
import poolingpeople.webapplication.business.utils.helpers.RestObjectsHelper.EffortWithTaskContainer;
import scala.annotation.meta.getter;

public class EffortBoundryTest extends AbstractTest{

	@Inject 
	EffortBoundry target;

	String effortRequestFile = "effort-task-create-request.json";
	String effortResponseFile = "effort-task-create-response.json";

	String taskRequestFile = "task-create-request.json";

	@Test
	public void testGetEffort() throws Exception{

		EffortWithTaskContainer<String,String> container = restObjectsHelper.insertEffortFromFile(effortRequestFile);
		Response r = target.getEffort(container.getEffort().get("id"));
		Map<String, String> actual = restObjectsHelper.convertJsonToMap((String) r.getEntity());
		assertTrue(restObjectsHelper.mapsAreEquals(container.getEffort(), actual));
	}

	@Test
	public void testGetEfforts() throws JsonGenerationException, JsonMappingException, IOException {
		EffortWithTaskContainer<String, String> expected = restObjectsHelper.createEffortListFromEffortFile(effortRequestFile, 3);
		Response allEfforts = target.getEfforts(expected.getTask().get("id"));
		assertEquals(Response.Status.OK, allEfforts.getStatusInfo());

		@SuppressWarnings("unchecked")
		List<Map<String, String>> actuall = mapper.readValue((String)allEfforts.getEntity(), List.class);
		assertTrue(restObjectsHelper.mapsListAreEquals(expected.getEfforts(), actuall));
	}

	@Test
	public void testUpdateEffort() throws JsonParseException, JsonMappingException, IOException {
		String newComment = "lalalalasda";
		Integer newEffort = 10;
		EffortWithTaskContainer<String,Object> expected = restObjectsHelper.insertEffortFromFile(effortRequestFile);
		expected.getEffort().put("comment", newComment);
		expected.getEffort().put("time", newEffort);

		Response r = target.updateEffort(
				(String)expected.getTask().get("id"), 
				(String)expected.getEffort().get("id"), 
				restObjectsHelper.convertMapToJson(expected.getEffort()));

		/*
		 * Status is correct
		 */
		assertEquals(Status.NO_CONTENT.getStatusCode(), r.getStatus());

		/*
		 * Update has been really done
		 */
		Map<String, Object> m = restObjectsHelper.getEffort((String)expected.getEffort().get("id"));
		assertTrue(restObjectsHelper.mapsAreEquals(m, expected.getEffort()));

		/*
		 * Task time has been updated
		 */
		Map<String, Object> task = restObjectsHelper.getTask((String)expected.getTask().get("id"));
		assertEquals(0, expected.getTask().get("effort"));
		assertEquals(expected.getEffort().get("time"), task.get("effort"));

	}

	@Test
	public void testSaveEffort() throws JsonParseException, JsonMappingException, IOException {
		Map<String, Object> task = restObjectsHelper.insertTaskFromFile(taskRequestFile);
		Response r = target.saveEffort((String) task.get("id"), FileLoader.getText(effortRequestFile));
		assertEquals(Status.OK.getStatusCode(), r.getStatus());

		/*
		 * Effort has been saved
		 */
		Map<String, Object> actual = restObjectsHelper.convertJsonToMap((String) r.getEntity());
		actual = restObjectsHelper.getEffort((String) actual.get("id"));
		Map<String, Object> expected = restObjectsHelper.convertJsonFileToMap(effortResponseFile);
		expected.put("id", actual.get("id"));
		assertTrue(restObjectsHelper.mapsAreEquals(expected, actual));

		/*
		 * Task time has been updated
		 */
		task = restObjectsHelper.getTask((String) task.get("id"));
		assertEquals(actual.get("time"), task.get("effort"));

	}

	@Test()
	public void testDeleteEffort() throws JsonGenerationException, JsonMappingException, IOException {
		
		EffortWithTaskContainer<String,Object> createdEffortData = restObjectsHelper.insertEffortFromFile(effortRequestFile);
		
		Response r = target.deleteEffort(
				(String)createdEffortData.getTask().get("id"), 
				(String)createdEffortData.getEffort().get("id"));
		
		assertEquals(Status.NO_CONTENT.getStatusCode(), r.getStatus());
		
		try{
			target.getEffort((String) createdEffortData.getEffort().get("id"));
		}catch(WebApplicationException e){
			assertEquals(Status.NOT_FOUND.getStatusCode(), e.getResponse().getStatus());
		}
	}

}










































