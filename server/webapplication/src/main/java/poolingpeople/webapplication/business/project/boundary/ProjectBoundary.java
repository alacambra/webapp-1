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

import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.SetMixinView;
import poolingpeople.webapplication.business.boundary.View;
import poolingpeople.webapplication.business.entity.DTOConverter;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.project.entity.ProjectStatus;

@Path("projects")
@Stateless
@Neo4jTransaction
@CatchWebAppException
public class ProjectBoundary {

	@Inject
	@SetMixinView(entity = Project.class, mixin = ProjectMixin.class)
	ObjectMapper mapper;

	@Inject
	EntityFactory entityFactory;

	@Inject
	DTOConverter dtoConverter;
	

	@GET
	@Path("{id:[\\w\\d-]+}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProjectById(@PathParam("id") String id)
			throws JsonGenerationException, JsonMappingException, IOException {
		String r = mapper.writerWithView(ProjectMixin.class).writeValueAsString(
				entityFactory.getProjectById(id));
		return Response.ok().entity(r).build();
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getAllProject() throws JsonGenerationException,
			JsonMappingException, IOException {
		String r = mapper.writerWithView(View.SampleView.class)
				.writeValueAsString(entityFactory.getAllProject());
		return Response.ok().entity(r).build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response saveProject(String json) throws JsonParseException,
			JsonMappingException, IOException {
		Project dtoProject = mapper.readValue(json, ProjectDTO.class);
		Project Project = dtoConverter.fromDTOtoPersitedBean(dtoProject,
				entityFactory.createProject());
		return Response.ok().entity(mapper.writeValueAsString(Project)).build();
	}

	@PUT
	@Path("{id:[\\w\\d-]+}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateProject(@PathParam("id") String uuid, String json)
			throws JsonParseException, JsonMappingException, IOException {
		Project dtoProject = mapper.readValue(json, ProjectDTO.class);
		Project Project = dtoConverter.fromDTOtoPersitedBean(dtoProject,
				entityFactory.getProjectById(uuid));
		String r = mapper.writeValueAsString(Project);
		return Response.ok().entity(r).build();
	}

	@DELETE
	@Path("{id:[\\w\\d-]+}")
	public Response deleteProject(@PathParam("id") String uuid) {
		entityFactory.deleteProject(uuid);
		return Response.ok().build();
	}

	@GET
	@Path("fakeit")
	@Produces(MediaType.APPLICATION_JSON)
	public Response fakeProject() throws JsonGenerationException,
			JsonMappingException, IOException {
		Project persistedProject = entityFactory.createProject();
		persistedProject.setDescription("desc");
		persistedProject.setEndDate(1L);
		persistedProject.setStartDate(2L);
		persistedProject.setTitle("title");
		persistedProject.setStatus(ProjectStatus.ARCHIVED);
		String r = mapper.writeValueAsString(persistedProject);
		return Response.ok().entity(r).build();
	}
}
