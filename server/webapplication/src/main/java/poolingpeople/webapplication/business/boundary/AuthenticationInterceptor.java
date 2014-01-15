package poolingpeople.webapplication.business.boundary;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.NotFoundException;

import org.apache.log4j.Logger;

import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;

@Interceptor
@AuthValidator
public class AuthenticationInterceptor {

	@Inject
	private LoggedUserContainer loggedUserContainer;

	Logger logger = Logger.getLogger(this.getClass());

	@AroundInvoke
	public Object checkCallPermission(InvocationContext context) throws Exception {

		loggedUserContainer.validateCredentials();
		return context.proceed();

	}
}
