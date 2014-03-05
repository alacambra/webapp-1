package poolingpeople.webapplication.business.boundary;

import javax.enterprise.context.Dependent;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import poolingpeople.webapplication.business.utils.configuration.boundary.Configurable;

@Interceptor
@AuthValidator
//@RequestScoped
@Dependent
public class AuthenticationInterceptor {

	@Inject
	private ILoggedUserContainer loggedUserContainer;

        @Inject
        @Configurable("debug")
        private boolean isDebugging;
        
	@AroundInvoke
	public Object checkCallPermission(InvocationContext context) throws Exception {

                if(! isDebugging) {
            
                    loggedUserContainer.validateCredentials();

                    if (!loggedUserContainer.userIsSuccessfullyLogged() && context.getMethod().getAnnotation(AuthNotRequired.class) == null) {
                            throw new WebApplicationException(Status.UNAUTHORIZED);
                    }
		
                }
		return context.proceed();

	}
}