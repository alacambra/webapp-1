package poolingpeople.webapplication.business.task.boundary;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.Comment;
import poolingpeople.commons.entities.Effort;
import poolingpeople.commons.entities.Project;
import poolingpeople.commons.entities.Task;
import poolingpeople.commons.entities.TaskPriority;
import poolingpeople.commons.entities.TaskStatus;
import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.boundary.AbstractBoundary;
import poolingpeople.webapplication.business.boundary.AuthValidator;
import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.JsonViews;
import poolingpeople.webapplication.business.boundary.UpdateTask;
import poolingpeople.webapplication.business.task.entity.TaskDTO;

@Path("tasks")
@Stateless
@Neo4jTransaction
@AuthValidator
@CatchWebAppException
public class TaskBoundary extends AbstractBoundary{

	/************************************* TASK CRUD *************************************/
	@GET
	@Path(idPattern)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getTaskById(@PathParam("id") String id)
			throws JsonGenerationException, JsonMappingException, IOException {
		String r = mapper.writerWithView(JsonViews.FullTask.class).writeValueAsString(entityFactory.getTaskById(id));
		return Response.ok().entity(r).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllTask() throws JsonGenerationException,
	JsonMappingException, IOException {
		
		 List<Task> list = new ArrayList<>();
		 for ( Task t : entityFactory.getAllTask() ){
			 if ( t.getParent() == null ) {
				 list.add(t);
			 }
		 }
		
		String r = mapper.writerWithView(JsonViews.BasicTask.class).writeValueAsString(list);
		return Response.ok().entity(r).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path(idPattern + "/subtasks")
	public Response getSubtasks(@PathParam("id") String id) throws JsonGenerationException,
	JsonMappingException, IOException {
		String r = mapper.writerWithView(JsonViews.FullTask.class).writeValueAsString(entityFactory.getTaskById(id).getSubtasks());
		return Response.ok().entity(r).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveTask(String json) throws JsonParseException,
	JsonMappingException, IOException {
		Task dtoTask = mapper.readValue(json, TaskDTO.class);
		Task task = entityFactory.createTask(dtoTask);
		task.setAssignee(loggedUserContainer.getUser());
		return Response.ok().entity(mapper.writerWithView(JsonViews.FullTask.class).writeValueAsString(task)).build();
	}

	@PUT
	@Path(idPattern)
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateTask(@PathParam("id") String uuid, String json)
			throws JsonParseException, JsonMappingException, IOException {
		Task dtoTask = mapper.readValue(json, TaskDTO.class);
		Task task = entityFactory.getTaskById(uuid);
		
		TaskDTO oldTask = new TaskDTO();
		oldTask.synchronizeWith(task);
		
		task.synchronizeWith(dtoTask);
		
		UpdateTask data = new UpdateTask(oldTask, task);
		updateTaskEvent.fire(data);
		
		String r = mapper.writerWithView(JsonViews.FullTask.class).writeValueAsString(task);
		return Response.ok().entity(r).build();
	}

	@DELETE
	@Path(idPattern)
	public Response deleteTask(@PathParam("id") String uuid) {
		entityFactory.deleteTask(uuid);
		return Response.noContent().build();
	}

	/************************************* USER action TASK in TASK *************************************/

	@POST
	@Path("/as/subtask/" + "{parentId:" + uuidRegexPattern + "}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createSubtaskInTask(@PathParam("parentId") String parentId, String json)
			throws JsonParseException, JsonMappingException, IOException{

		Task parentTask = entityFactory.getTaskById(parentId);
		Task dtoTask = mapper.readValue(json, TaskDTO.class);
		Task task = entityFactory.createTask(dtoTask);
		task.setAssignee(loggedUserContainer.getUser());
		parentTask.addSubtask(task);

		String r = mapper.writerWithView(JsonViews.FullTask.class).writeValueAsString(task);
		return Response.ok().entity(r).build();

	}

	@PUT
	@Path(idPattern + "/as/subtask/" + "{parentId:" + uuidRegexPattern + "}")
	public Response addSubtaskToTask(@PathParam("id") String childId, @PathParam("parentId") String parentId){

		Task parentTask = entityFactory.getTaskById(parentId);
		Task childTask = entityFactory.getTaskById(childId);

		parentTask.addSubtask(childTask);
		return Response.noContent().build();
	}

	@PUT
	@Path(idPattern + "/from/task/" + "{sourceId:" + uuidRegexPattern + "}" + "/to/" + "{targetId:" + uuidRegexPattern + "}")
	public Response moveSubtaskFromTaskToTask(
			@PathParam("id") String taskId, 
			@PathParam("sourceId") String sourceId,
			@PathParam("targetId") String targetId
			){

		Task source = entityFactory.getTaskById(sourceId);
		Task target = entityFactory.getTaskById(targetId);
		Task task = entityFactory.getTaskById(taskId);

		source.removeTaskRelation(task);
		target.addSubtask(task);

		return Response.noContent().build();
	}

	/************************************* USER action TASK in PROJECT *************************************/
	@POST
	@Path("/in/project/" + "{projectId:" + uuidRegexPattern + "}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createTaskInProject(@PathParam("projectId") String projectId, String json) 
			throws JsonParseException, JsonMappingException, IOException{

		Project p = entityFactory.getProjectById(projectId);
		Task dtoTask = mapper.readValue(json, TaskDTO.class);
		Task task = entityFactory.createTask(dtoTask);
		task.setAssignee(loggedUserContainer.getUser());
		p.addTask(task);

		String r = mapper.writerWithView(JsonViews.FullTask.class).writeValueAsString(task);
		return Response.ok().entity(r).build();
	}


	@PUT
	@Path(idPattern + "/in/project/" + "{projectId:" + uuidRegexPattern + "}")
	public Response addTaskToProject(@PathParam("id") String taskId, @PathParam("projectId") String projectId) 
			throws JsonParseException, JsonMappingException, IOException{

		Project p = entityFactory.getProjectById(projectId);
		Task task = entityFactory.getTaskById(taskId);
		p.addTask(task);
		return Response.noContent().build();
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

	/************************************* USER - TASK *************************************/
	@PUT 
	@Path(idPattern + "/to/user/{userId:" + uuidRegexPattern + "}")
	public Response assignTaskToUser(@PathParam("id") String taskId, @PathParam("userId") String userId){

		User user = entityFactory.getUserById(userId);
		Task task = entityFactory.getTaskById(taskId);
		
		List<Task> tasks = user.getTasks();
		boolean error = false;
		for (Task oldTask : tasks) {
			
			/*
			 * new task is future || in past
			 */
			if ((oldTask.getEndDate() < task.getStartDate() && oldTask.getEndDate() < task.getEndDate())
					|| (oldTask.getStartDate() > task.getEndDate() && oldTask.getStartDate() > task.getStartDate())) {
				continue;
			}
			
			error = true;
			break;
			
		}
		
		task.setAssignee(user);
		
		return error ? Response.noContent().header("X-Warning", true).build() : Response.noContent().build();
	}
}













































































