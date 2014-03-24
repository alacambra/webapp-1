package poolingpeople.webapplication.business.changelog.boundary;

import java.io.IOException;
import java.util.ArrayList;

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

@Path("changelog")
@Stateless
@Neo4jTransaction
@CatchWebAppException
@AuthValidator
public class ChangelogBoundary extends AbstractBoundary{

	@GET
	@Path("/of/object/" + idPattern)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCommentsOfObject(@PathParam("id") String id)
			throws JsonGenerationException, JsonMappingException, IOException {
		
		String r = mapper.writerWithView(JsonViews.CommentsWithSubject.class).writeValueAsString(new ArrayList<>());
		return Response.ok().entity(r).build();
		
	}
	
}


































































