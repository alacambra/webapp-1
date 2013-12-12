package poolingpeople.webapplication.business.boundary;

import java.io.IOException;

import javax.ejb.Stateful;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;
import org.neo4j.graphdb.NotFoundException;

import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.entity.ITask;
import poolingpeople.webapplication.business.entity.PersistedTask;
import poolingpeople.webapplication.business.entity.TaskDTO;
import poolingpeople.webapplication.business.entity.TaskPriority;
import poolingpeople.webapplication.business.entity.TaskStatus;
import poolingpeople.webapplication.business.neo4j.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.NotUniqueException;

@Path("task")
@Stateful
@Neo4jTransaction
public class TaskBoundary {
	private Logger logger = Logger.getLogger(this.getClass());
	private final ObjectMapper mapper = new ObjectMapper();

	//	@Inject
	private EntityFactory entityFactory;

	//	@Inject 
	private DTOConverter dtoConverter = new DTOConverter();

	public TaskBoundary() {
		entityFactory = new EntityFactory(new NeoManager(GraphDatabaseServiceProducer.getGraphDb()));
		mapper.registerModule(new TaskMixinModule());
	}

	public TaskBoundary(EntityFactory entityFactory, DTOConverter dtoConverter) {
		this();
		this.entityFactory = entityFactory;
		this.dtoConverter = dtoConverter;
	}

	public class TaskMixinModule extends SimpleModule
	{
		public TaskMixinModule() {
			super("TaskMixin", new Version(0,0,1,null));
		}

		@Override
		public void setupModule(SetupContext context)
		{
			context.setMixInAnnotations(ITask.class	, TaskMixin.class);
		}
	}

	@GET
	@Path("{id:[\\w\\d-]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTask(@PathParam("id") String id) {

		try {
			ITask task = entityFactory.getTask(id);
			String r = mapper.writerWithView(TaskMixin.class).writeValueAsString(task);
			return Response.ok().entity(r).build();
		} catch (NotUniqueException e) {
			throw new WebApplicationException("Node is not unique");
		} catch (NotFoundException e) {
			throw new WebApplicationException(e, Response.status(Status.NOT_FOUND).entity("Task with ID " + id + " not found").build());
		} 
		catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTask() {
		try {

			String r;
			r = mapper.writerWithView(View.SampleView.class).writeValueAsString(entityFactory.getAllTask());
			return Response.ok().entity(r).build();
		} catch (JsonGenerationException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.BAD_REQUEST).entity("invalid Json. Deserialize not possible").build());
		} catch (JsonMappingException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build());
		} catch (IOException e) {
			throw new WebApplicationException(e.getMessage(), e);
		} catch (RuntimeException e) {
			throw new WebApplicationException(e);
		}

	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveTask(String json) {

		try {

			ITask persistedTask = mapper.readValue(json, PersistedTask.class);
			String r = mapper.writeValueAsString(persistedTask);
			return Response.ok().entity(r).build();

		} catch (JsonGenerationException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.BAD_REQUEST).entity("invalid Json. Deserialize not possible").build());
		} catch (JsonMappingException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build());
		} catch (IOException e) {
			throw new WebApplicationException(e.getMessage(), e);
		} catch (RuntimeException e) {
			throw new WebApplicationException(e);
		}
	}

	@PUT
	@Path("{id:[\\w\\d-]+}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateTask(@PathParam("id") String uuid, String json){

		try {

			ITask dtoTask = mapper.readValue(json, TaskDTO.class);
			ITask task = dtoConverter.fromDTOtoPersitedBean(dtoTask, entityFactory.getTask(uuid));
			String r = mapper.writeValueAsString(task);
			return Response.ok().entity(r).build();

		} catch (JsonGenerationException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.BAD_REQUEST).entity("invalid Json. Deserialize not possible").build());
		} catch (JsonMappingException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.BAD_REQUEST).entity(e.getMessage()).build());
		} catch (IOException e) {
			throw new WebApplicationException(e.getMessage(), e);
		} catch (NotUniqueException e) {
			throw new WebApplicationException(e.getMessage(), e);
		} catch (NodeNotFoundException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.NOT_FOUND).entity(e.getMessage()).build());
		}
		catch (Exception e) {
			throw new WebApplicationException(e.getMessage(), e);
		}
	}

	@DELETE
	@Path("{id:[\\w\\d-]+}")
	public Response deleteTask(@PathParam("id") String uuid) {
		try {
			entityFactory.deleteTask(uuid);
			return Response.ok().build();

		} catch (NodeNotFoundException e) {
			throw new WebApplicationException(e, 
					Response.status(Status.NOT_FOUND).entity(e.getMessage()).build());
		} catch (Exception e) {
			throw new WebApplicationException(e);
		}
	}

	@GET
	@Path("fakeit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fakeTask() {
		throw new WebApplicationException( 
				Response.status(Status.NOT_FOUND).entity("lalalala").build());
//		try {
//
//			ITask persistedTask = entityFactory.createTask();
//			persistedTask.setDescription("desc");
//			persistedTask.setEndDate(1L);
//			persistedTask.setStartDate(2L);
//			persistedTask.setPriority(TaskPriority.HIGH);
//			persistedTask.setProgress((float) 0.25);
//			persistedTask.setTitle("title");
//			persistedTask.setDuration(34);
//			persistedTask.setStatus(TaskStatus.ARCHIVED);
//			String r = mapper.writeValueAsString(persistedTask);
//			return Response.ok().entity(r).build();
//
//		}catch(Throwable e) {
//			logger.error("", e);
//			throw new WebApplicationException(e);
//		}
	}
}
