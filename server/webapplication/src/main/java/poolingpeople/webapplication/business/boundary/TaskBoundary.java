package poolingpeople.webapplication.business.boundary;

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

import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.entity.PersistedTask;
import poolingpeople.webapplication.business.entity.Task;
import poolingpeople.webapplication.business.entity.TaskDTO;
import poolingpeople.webapplication.business.entity.TaskPriority;
import poolingpeople.webapplication.business.entity.TaskStatus;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;

@Path("task")
@Stateless
@Neo4jTransaction
@CatchWebAppException
public class TaskBoundary {

	@Inject
	@SetMixinView(entity = Task.class, mixin = TaskMixin.class)
	ObjectMapper mapper;

	@Inject
	EntityFactory entityFactory;

	@Inject
	DTOConverter dtoConverter;

	public TaskBoundary() {
	}

	// TODO unnecessary: remove overloaded constructor
	public TaskBoundary(EntityFactory entityFactory, DTOConverter dtoConverter) {
		this.entityFactory = entityFactory;
		this.dtoConverter = dtoConverter;
	}

	@GET
	@Path("{id:[\\w\\d-]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTask(@PathParam("id") String id)
			throws JsonGenerationException, JsonMappingException, IOException {
		String r = mapper.writerWithView(TaskMixin.class).writeValueAsString(
				entityFactory.getTaskById(id));
		return Response.ok().entity(r).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTask() throws JsonGenerationException,
			JsonMappingException, IOException {
		String r = mapper.writerWithView(View.SampleView.class)
				.writeValueAsString(entityFactory.getAllTask());
		return Response.ok().entity(r).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.TEXT_PLAIN)
	public Response saveTask(String json) throws JsonParseException,
			JsonMappingException, IOException {
		Task persistedTask = mapper.readValue(json, PersistedTask.class);
		return Response.ok().entity(persistedTask.getId()).build();
	}

	@PUT
	@Path("{id:[\\w\\d-]+}")
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
	@Path("{id:[\\w\\d-]+}")
	public Response deleteTask(@PathParam("id") String uuid) {
		entityFactory.deleteTask(uuid);
		return Response.ok().build();
	}

	@GET
	@Path("fakeit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fakeTask() throws JsonGenerationException,
			JsonMappingException, IOException {
		Task persistedTask = entityFactory.createTask();
		persistedTask.setDescription("desc");
		persistedTask.setEndDate(1L);
		persistedTask.setStartDate(2L);
		persistedTask.setPriority(TaskPriority.HIGH);
		persistedTask.setProgress((float) 0.25);
		persistedTask.setTitle("title");
		persistedTask.setDuration(34);
		persistedTask.setStatus(TaskStatus.ARCHIVED);
		String r = mapper.writeValueAsString(persistedTask);
		return Response.ok().entity(r).build();
	}
}
