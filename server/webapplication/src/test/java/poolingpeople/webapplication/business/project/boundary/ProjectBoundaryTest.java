package poolingpeople.webapplication.business.project.boundary;

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

public class ProjectBoundaryTest extends AbstractTest {

	String projectRequestFile = "project-create-request.json";
	String projectResponseFile = "project-create-response.json";
	
	@Inject
	ProjectBoundary target;
	
	@Test
	public void testGetProjectById() throws JsonGenerationException, JsonMappingException, IOException {
		Map<String,Object> createdProjectData = insertProjectFromFile(projectRequestFile);
		Map<String,Object> expectedProjectData = convertJsonFileToMap(projectResponseFile);
		expectedProjectData.put("id", createdProjectData.get("id"));

		Response response = target.getProjectById((String) createdProjectData.get("id"));
		assertEquals(Response.Status.OK, response.getStatusInfo());
		Map<String,Object> receivedProjectData = convertJsonToMap((String)response.getEntity());

		assertTrue(mapsAreEquals(expectedProjectData, receivedProjectData));
	}

	@Test
	public void testGetAllProject() throws JsonGenerationException, JsonMappingException, IOException {
		List<Map<String, Object>> expected = createProjectListFromProjectFile(projectRequestFile, 3);
		System.out.println(expected);
		Response projects = target.getAllProject();
		assertEquals(Response.Status.OK, projects.getStatusInfo());

		@SuppressWarnings("unchecked")
		List<Map<String, Object>> actual = mapper.readValue((String)projects.getEntity(), List.class);
		assertTrue(mapsListAreEquals(expected, actual));
	}

	@Test
	public void testSaveProject() throws JsonParseException, JsonMappingException, IOException {
		
		Map<String,Object> expectedProject = convertJsonFileToMap(projectResponseFile);
		Response response = target.saveProject(FileLoader.getText(jsonModelsPath + projectRequestFile));
		assertEquals(Response.Status.OK, response.getStatusInfo());
		Map<String,Object> actual = convertJsonToMap((String) response.getEntity());
		expectedProject.put("id", actual.get("id"));
		assertTrue(mapsAreEquals(expectedProject, actual));
		
	}

	@Test
	public void testUpdateProject() throws JsonParseException, JsonMappingException, IOException {
		String title = "title under test";
		Map<String,Object> createdProject = insertProjectFromFile(projectRequestFile);
		createdProject.put("title", title);
		String json = convertMapToJson(createdProject);
		Response r = target.updateProject((String) createdProject.get("id"), json);
		assertEquals(Status.OK.getStatusCode(), r.getStatus());
		Map<String,Object> receivedTaskdata = convertJsonToMap((String)r.getEntity());
		assertTrue(mapsAreEquals(receivedTaskdata, createdProject));
	}

	@Test
	public void testDeleteProject() throws JsonGenerationException, JsonMappingException, IOException {
		
		Map<String,String> createdProject= insertTaskFromFile("task-create-request.json");
		Response r = target.deleteProject(createdProject.get("id"));
		assertEquals(Status.NO_CONTENT.getStatusCode(), r.getStatus());
		try{
			target.getProjectById(createdProject.get("id"));
		}catch(WebApplicationException e){
			assertEquals(Status.NOT_FOUND.getStatusCode(), e.getResponse().getStatus());
		}
	}

}






















































