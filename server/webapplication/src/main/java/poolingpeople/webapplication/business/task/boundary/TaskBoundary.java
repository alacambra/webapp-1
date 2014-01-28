package poolingpeople.webapplication.business.task.boundary;

import java.io.IOException;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
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

import poolingpeople.webapplication.business.boundary.AuthValidator;
import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.JsonViews;
import poolingpeople.webapplication.business.boundary.LoggedUserContainer;
import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.task.entity.PersistedTask;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.task.entity.TaskPriority;
import poolingpeople.webapplication.business.task.entity.TaskStatus;

@Path("tasks")
@Stateless
@Neo4jTransaction
@AuthValidator
@CatchWebAppException
public class TaskBoundary extends AbstractBoundry{

	@Inject
	HttpServletRequest request;

	@Inject
	ObjectMapper mapper;

	@Inject
	EntityFactory entityFactory;

	@Inject
	DTOConverter dtoConverter;

	@Inject
	LoggedUserContainer loggedUserContainer;


	/************************************* TASK CRUD *************************************/
	@GET
	@Path(idPattern)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTaskById(@PathParam("id") String id)
			throws JsonGenerationException, JsonMappingException, IOException {
		String r = mapper.writeValueAsString(
				entityFactory.getTaskById(id));
		return Response.ok().entity(r).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTask() throws JsonGenerationException,
	JsonMappingException, IOException {
		String r = mapper.writeValueAsString(entityFactory.getAllTask());
		return Response.ok().entity(r).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveTask(String json) throws JsonParseException,
	JsonMappingException, IOException {
		Task dtoTask = mapper.readValue(json, TaskDTO.class);
		Task task = entityFactory.createTask(dtoTask);
		return Response.ok().entity(mapper.writeValueAsString(task)).build();
	}

	@PUT
	@Path(idPattern)
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateTask(@PathParam("id") String uuid, String json)
			throws JsonParseException, JsonMappingException, IOException {
		Task dtoTask = mapper.readValue(json, TaskDTO.class);
		Task task = dtoConverter.fromDTOtoPersitedBean(dtoTask,
				entityFactory.getTaskById(uuid));
		String r = mapper.writeValueAsString(task);
		return Response.ok().entity(r).build();
	}

	@DELETE
	@Path(idPattern)
	public Response deleteTask(@PathParam("id") String uuid) {
		entityFactory.deleteTask(uuid);
		return Response.noContent().build();
	}

	/************************************* USER action TASK in PROJECT *************************************/
	@POST
	@Path("/in/project/" + "{projectId:" + uuidRegexPattern + "}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createTaskInProject(@PathParam("id") String uuid, @PathParam("projectId") String projectId, String json) throws JsonParseException, JsonMappingException, IOException{

		Project p = entityFactory.getProjectById(projectId);
		Task dtoTask = mapper.readValue(json, TaskDTO.class);
		Task task = entityFactory.createTask(dtoTask);
		p.addTask(task);
		
		String r = mapper.writeValueAsString(task);
		return Response.ok().entity(r).build();
	}

	@PUT
	@Path(idPattern + "/from/project/" + "{sourceId:" + uuidRegexPattern + "}/to/" + "{targetId:" + uuidRegexPattern + "}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response moveTaskFromProjectToProject(
			@PathParam("id") String uuid, 
			@PathParam("sourceId") String sourceId, 
			@PathParam("targetId") String targetId){

		Project source = entityFactory.getProjectById(sourceId);
		Project target = entityFactory.getProjectById(targetId);
		Task t =  entityFactory.getTaskById(uuid);
		
		source.removeTaskRelation(t);
		target.addTask(t);
		
		return Response.noContent().build();
	}

}






















































































