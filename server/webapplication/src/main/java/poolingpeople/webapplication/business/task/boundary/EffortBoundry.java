package poolingpeople.webapplication.business.task.boundary;

import java.io.IOException;
import java.util.Date;

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

import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.SetMixinView;
import poolingpeople.webapplication.business.boundary.View;
import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.task.entity.TaskPriority;
import poolingpeople.webapplication.business.task.entity.TaskStatus;

@Path("tasks/{taskId:[\\w\\d-]+}/efforts/")
@Stateless
@Neo4jTransaction
@CatchWebAppException
public class EffortBoundry {

	@Inject
	@SetMixinView(entity = Effort.class, mixin = EffortMixin.class)
	ObjectMapper mapper;

	@Inject
	EntityFactory entityFactory;

	@Inject
	DTOConverter dtoConverter;

	@GET
	@Path("{id:[\\w\\d-]+}")
	public Response getEffort(@PathParam("id") String uuid) throws JsonGenerationException, JsonMappingException, IOException{
		String r = mapper.writerWithView(EffortMixin.class).writeValueAsString(entityFactory.getEffortById(uuid));
		return Response.ok().entity(r).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEfforts(@PathParam("taskId") String taskId) throws JsonGenerationException, JsonMappingException, IOException {

		Task task = entityFactory.getTaskById(taskId);
		String r = mapper.writerWithView(View.SampleView.class).writeValueAsString(task.getEfforts());
		return Response.ok().entity(r).build();
	}

	@PUT
	@Path("{id:[\\w\\d-]+}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON) 
	public Response updateEffort(@PathParam("taskId") String taskId, @PathParam("id") String uuid, String json)
			throws JsonParseException, JsonMappingException, IOException{

		Effort dtoEffort = mapper.readValue(json, EffortDto.class);
		Effort effort = dtoConverter.fromDTOtoPersitedBean(dtoEffort, entityFactory.getEffortById(uuid));
		String r = mapper.writeValueAsString(effort);
		return Response.ok().entity(r).build();

	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveEffort(@PathParam("taskId") String taskId, String json) 
			throws JsonParseException, JsonMappingException, IOException {

		Effort dtoEffort = mapper.readValue(json, EffortDto.class);
		Task task = entityFactory.getTaskById(taskId);
		Effort effort = dtoConverter.fromDTOtoPersitedBean(dtoEffort, entityFactory.createEffort());
		task.addEffort(effort);

		return Response.ok().entity(mapper.writeValueAsString(effort)).build();
	}
	
	@DELETE
	@Path("{id:[\\w\\d-]+}")
	public Response deleteTask(@PathParam("taskId") String taskId, @PathParam("id") String uuid) {
		
		Task task = entityFactory.getTaskById(taskId);
		task.deleteEffort(uuid);
		
		return Response.ok().build();
	}

	//TODO: destroy it. Its just for development time....
	@GET
	@Path("fakeit/{quantity:[\\d]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fakeTask(@PathParam("quantity") int quantity) 
			throws JsonGenerationException, JsonMappingException, IOException {

		Task persistedTask = entityFactory.createTask();
		persistedTask.setDescription("faked task to use with efforts");
		persistedTask.setEndDate(1L);
		persistedTask.setStartDate(2L);
		persistedTask.setPriority(TaskPriority.HIGH);
		persistedTask.setProgress((float) 0.25);
		persistedTask.setTitle("EffortedTask");
		persistedTask.setDuration(34);
		persistedTask.setStatus(TaskStatus.ARCHIVED);

		for (int i = 0; i<quantity; i++) {
			persistedTask.addEffort(generateEffort());
		}

		String r = mapper.writeValueAsString(persistedTask.getEfforts());
		return Response.ok().entity(r).build();
	}

	//TODO: destroy it. Its just for development time....
	private Effort generateEffort() {
		Effort effort = entityFactory.createEffort();

		effort.setComment("some comment");
		effort.setDate(new Date().getTime());
		effort.setTime(2);

		return effort;
	}		
}


















