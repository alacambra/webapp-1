package poolingpeople.webapplication.business.user.boundary;

import javax.ejb.Stateless;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import poolingpeople.webapplication.business.boundary.AuthValidator;
import poolingpeople.webapplication.business.boundary.CatchWebAppException;
import poolingpeople.webapplication.business.neo4j.Neo4jTransaction;

@Path("user_sessions")
@Stateless
@Neo4jTransaction
@CatchWebAppException
@AuthValidator
public class UserSessions {

	@POST
	public void credentialsAreValid(){}
	
}
