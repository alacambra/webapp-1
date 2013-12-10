package poolingpeople.webapplication.business.boundary;

import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;

@Interceptor
@AuthValidator
public class AuthenticationInterceptor {

	@Resource
	private SessionContext sessionContext;
	
	@AroundInvoke
	public Object checkCallPermission(InvocationContext context) throws Exception {
		System.out.println(sessionContext.getCallerPrincipal().getName());
		return context.proceed();
	}
}
