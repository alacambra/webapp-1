package poolingpeople.webapplication.business.boundary;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import org.apache.log4j.Logger;

import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import scala.noinline;

@Interceptor
@AuthValidator
public class AuthenticationInterceptor {

	@Inject
	private LoggedUserContainer loggedUserContainer;

	Logger logger = Logger.getLogger(this.getClass());

	@AroundInvoke
	public Object checkCallPermission(InvocationContext context) throws Exception {

//		loggedUserContainer.validateCredentials();
//		
//		if (!loggedUserContainer.userIsSuccessfullyLogged() && context.getMethod().getAnnotation(AuthNotRequired.class) == null) {
//			throw new WebApplicationException(Status.UNAUTHORIZED);
//		}
		
		return context.proceed();

	}
}
