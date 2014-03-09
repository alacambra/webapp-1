package poolingpeople.webapplication.business.comments.boundary;

import java.io.IOException;

import javax.ejb.Stateless;
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
import poolingpeople.commons.entities.Comment;
import poolingpeople.persistence.neo4j.Neo4jTransaction;
import poolingpeople.webapplication.business.boundary.AbstractBoundary;
import poolingpeople.webapplication.business.boundary.AuthValidator;
import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.JsonViews;

@Path("comments")
@Stateless
@Neo4jTransaction
@CatchWebAppException
@AuthValidator
public class CommentsBoundary extends AbstractBoundary{

	@GET
	@Path("/of/object/" + idPattern)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCommentsOfObject(@PathParam("id") String id)
			throws JsonGenerationException, JsonMappingException, IOException {
		
		String r = mapper.writerWithView(JsonViews.CommentsWithSubject.class).writeValueAsString("");
		return Response.ok().entity(r).build();
		
	}
	
	@POST
	@Path("{objectId:" + uuidRegexPattern + "}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.TEXT_PLAIN)
	public Response createComment(@PathParam("objectId") String id, String json)
			throws JsonGenerationException, JsonMappingException, IOException {
		
		Comment dtoComment = mapper.readValue(json, CommentsDTO.class);
		
		Project project = entityFactory.createProject(dtoProject);
		
		return Response.ok().entity(mapper.writerWithView(JsonViews.FullProject.class).writeValueAsString("")).build();
	}


	@PUT
	@Path(idPattern)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateComment(@PathParam("id") String uuid, String json)
			throws JsonParseException, JsonMappingException, IOException {
		
		Comment dtoProject = mapper.readValue(json, CommentsDTO.class);
//		Project persistedProject = entityFactory.getProjectById(uuid);
//		persistedProject.synchronizeWith(dtoProject);
//		String serializedProject = mapper.writerWithView(JsonViews.FullProject.class).writeValueAsString(persistedProject);
		return Response.noContent().build();
	}

	@DELETE
	@Path(idPattern)
	public Response deleteComment(@PathParam("id") String uuid) {
		entityFactory.deleteProject(uuid);
		return Response.noContent().build();
	}
}


































































