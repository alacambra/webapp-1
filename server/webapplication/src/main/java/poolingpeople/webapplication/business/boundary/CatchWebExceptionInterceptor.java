package poolingpeople.webapplication.business.boundary;

import java.io.IOException;

import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.WebApplicationException;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;

@Interceptor
@CatchWebAppException
public class CatchWebExceptionInterceptor {

	@AroundInvoke
	public Object catchRootException(InvocationContext context)
			throws Exception {
		try {
			return context.proceed();
		} catch (RootApplicationException e) {
			throw new WebApplicationException(e);
			//TODO implement specific JSON exception message
		} catch (JsonParseException jsonParseException) {
			throw new WebApplicationException(jsonParseException);
		} catch (JsonMappingException jsonMappingException) {
			throw new WebApplicationException(jsonMappingException);
		} catch (IOException ioException) {
			throw new WebApplicationException(ioException);
		}
	}
}
