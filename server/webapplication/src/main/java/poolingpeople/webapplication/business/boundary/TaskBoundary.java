package poolingpeople.webapplication.business.boundary;

import javax.ejb.Stateful;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;

import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.entity.ITask;
import poolingpeople.webapplication.business.entity.PersistedTask;
import poolingpeople.webapplication.business.entity.TaskDTO;
import poolingpeople.webapplication.business.entity.TaskPriority;
import poolingpeople.webapplication.business.entity.TaskStatus;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;

@Path("task")
@Stateful
//@RequestScoped
//@Stateless
@Neo4jTransaction
//@AuthValidator
public class TaskBoundary {

	private final ObjectMapper mapper = new ObjectMapper();

	@Inject
	private EntityFactory entityFactory;
	
	@Inject 
	private DTOConverter dtoConverter;

	public TaskBoundary() {
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
		} catch (Exception e) {
			System.err.println(e);
			return Response.serverError().entity(e.getMessage()).build();
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTask() {
		try {
			
			String r = mapper.writerWithView(View.SampleView.class).writeValueAsString(entityFactory.getAllTask());
			return Response.ok().entity(r).build();
		} catch (Exception e) {
			System.err.println(e);
			return Response.serverError().entity(e.getMessage()).build();
		}

	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveTask(String json) {

		try {

			ITask persistedTask = mapper.readValue(json, PersistedTask.class);
			String r = mapper.writeValueAsString(persistedTask);
			return Response.ok().entity(r).build();

		}catch(Throwable e) {
			System.err.println(e);
			throw new WebApplicationException(e);
		}
	}
	
	@PUT
	@Path("{id:[\\w\\d-]+}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateTask(String json) {

		try {

			ITask dtoTask = mapper.readValue(json, TaskDTO.class);
			ITask task = dtoConverter.fromDTOtoPersitedBean(dtoTask, entityFactory.createTask());
			String r = mapper.writeValueAsString(task);
			return Response.ok().entity(r).build();

		}catch(Throwable e) {
			System.err.println(e);
			throw new WebApplicationException(e);
		}
	}

	@PUT
	@Path("fakeit")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response fakeTask(String json) {

		try {

			ITask persistedTask = entityFactory.createTask();
			persistedTask.setDescription("desc");
			persistedTask.setEndDate(1L);
			persistedTask.setStartDate(2L);
			persistedTask.setPriority(TaskPriority.HIGH);
			persistedTask.setProgress(5);
			persistedTask.setTitle("title");
			persistedTask.setStatus(TaskStatus.ARCHIVED);
			String r = mapper.writeValueAsString(persistedTask);
			return Response.ok().entity(r).build();

		}catch(Throwable e) {
			System.err.println(e);
			throw new WebApplicationException(e);
		}
	}
}
