package poolingpeople.webapplication.business.task.boundary;

import java.io.IOException;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
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

import poolingpeople.webapplication.business.boundary.SetMixinView;
import poolingpeople.webapplication.business.boundary.View;
import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.task.entity.Task;

@Path("tasks/{taskId:[\\w\\d-]+}/")
public class EffortBoundry {
	
	@Inject
	@SetMixinView(entity = Effort.class, mixin = EffortMixin.class)
	ObjectMapper mapper;

	@Inject
	EntityFactory entityFactory;

	@Inject
	DTOConverter dtoConverter;
	
	@GET
	@Path("effort/{id:[\\w\\d-]+}")
	public Response getEffort(@PathParam("id") String uuid) throws JsonGenerationException, JsonMappingException, IOException{
		String r = mapper.writerWithView(EffortMixin.class).writeValueAsString(
				entityFactory.getEffortById(uuid));
		return Response.ok().entity(r).build();
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEfforts() throws JsonGenerationException, JsonMappingException, IOException {
		String r = mapper.writerWithView(View.SampleView.class)
				.writeValueAsString(entityFactory.getAllEfforts());
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
	public Response saveEffort(String json) throws JsonParseException, JsonMappingException, IOException {
		Effort dtoEffort = mapper.readValue(json, EffortDto.class);
		Effort effort = dtoConverter.fromDTOtoPersitedBean(dtoEffort,
				entityFactory.createEffort());
		return Response.ok().entity(mapper.writeValueAsString(effort)).build();
	}
}


















