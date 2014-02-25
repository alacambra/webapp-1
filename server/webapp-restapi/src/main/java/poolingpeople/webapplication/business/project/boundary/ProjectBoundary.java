package poolingpeople.webapplication.business.project.boundary;

import java.io.IOException;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import poolingpeople.commons.entities.EntityFactory;
import poolingpeople.commons.entities.Project;
import poolingpeople.commons.entities.ProjectStatus;
import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.boundary.AbstractBoundry;
import poolingpeople.webapplication.business.boundary.AuthValidator;
import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.JsonViews;
import poolingpeople.webapplication.business.entity.DTOConverter;

@Path("projects")
@Stateless
@Neo4jTransaction
@CatchWebAppException
@AuthValidator
public class ProjectBoundary extends AbstractBoundry{

	@Inject
	ObjectMapper mapper;

	@Inject
	EntityFactory entityFactory;

	@Inject 
	DTOConverter dtoConverter;
	

	@GET
	@Path(idPattern)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProjectById(@PathParam("id") String id)
			throws JsonGenerationException, JsonMappingException, IOException {
		String r = mapper.writerWithView(JsonViews.FullProject.class).writeValueAsString(
				entityFactory.getProjectById(id));
		return Response.ok().entity(r).build();
	}
	
	@GET
	@Path(idPattern + "/tasks/")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProjectTasks(@PathParam("id") String projectId)
			throws JsonGenerationException, JsonMappingException, IOException {
		String r = mapper.writerWithView(JsonViews.BasicTask.class).writeValueAsString(
				entityFactory.getProjectById(projectId).getTasks());
		return Response.ok().entity(r).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllProjects() throws JsonGenerationException,
			JsonMappingException, IOException {
		String r =
				mapper.writerWithView(JsonViews.BasicProject.class)
				.writeValueAsString(entityFactory.getAllProject());
		return Response.ok().entity(r).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveProject(String json) throws JsonParseException,
			JsonMappingException, IOException {
		Project dtoProject = mapper.readValue(json, ProjectDTO.class);
		Project project = entityFactory.createProject(dtoProject);
		return Response.ok().entity(mapper.writerWithView(JsonViews.FullProject.class).writeValueAsString(project)).build();
	}

	@PUT
	@Path(idPattern)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateProject(@PathParam("id") String uuid, String json)
			throws JsonParseException, JsonMappingException, IOException {
		
		Project dtoProject = mapper.readValue(json, ProjectDTO.class);
		dtoConverter.fromDTOtoPersitedBean(dtoProject, entityFactory.getProjectById(uuid));
		
		return Response.noContent().build();
	}

	@DELETE
	@Path(idPattern)
	public Response deleteProject(@PathParam("id") String uuid) {
		entityFactory.deleteProject(uuid);
		return Response.noContent().build();
	}
	
	@GET
	@Path("fakeit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fakeProject() throws JsonGenerationException,
			JsonMappingException, IOException {
		Project persistedProject = entityFactory.createProject(new ProjectDTO());
		persistedProject.setDescription("desc");
		persistedProject.setDefaultEndDate(1L);
		persistedProject.setDefaultStartDate(2L);
		persistedProject.setTitle("title");
		persistedProject.setStatus(ProjectStatus.ARCHIVED);
		String r = mapper.writeValueAsString(persistedProject);
		return Response.ok().entity(r).build();
	}
	
	/************************************* USER - TASK *************************************/
	@PUT 
	@Path(idPattern + "/to/user/{userId:" + uuidRegexPattern + "}")
	public Response assignTaskToUser(@PathParam("id") String projectId, @PathParam("userId") String userId){

		User user = entityFactory.getUserById(userId);
		Project project = entityFactory.getProjectById(projectId);
		project.setOwner(user);
		
		return Response.noContent().build();
	}
}


































































