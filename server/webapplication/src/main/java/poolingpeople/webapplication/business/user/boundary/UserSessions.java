package poolingpeople.webapplication.business.user.boundary;

import java.io.IOException;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import poolingpeople.webapplication.business.boundary.AuthValidator;
import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.boundary.ILoggedUserContainer;
import poolingpeople.webapplication.business.boundary.JsonViews;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;

@Path("user_sessions")
@Stateless
@Neo4jTransaction
@CatchWebAppException
@AuthValidator
public class UserSessions {

	@Inject
	private ILoggedUserContainer loggedUserContainer;
	
	@Inject
	private ObjectMapper mapper;
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	public Response credentialsAreValid() throws JsonGenerationException, JsonMappingException, IOException{
		
		String r = mapper.writerWithView(JsonViews.Shared.class).writeValueAsString(loggedUserContainer.getUser());		
		return Response.ok().entity(r).build();
	}
	
}
