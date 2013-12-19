package poolingpeople.webapplication.business.boundary;

import java.io.IOException;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;

import poolingpeople.webapplication.business.configuration.boundary.Configurable;
import poolingpeople.webapplication.business.neo4j.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.NotUniqueException;

@Interceptor
@CatchWebAppException
public class CatchWebExceptionInterceptor {

	@Inject
	@Configurable("invalidJson")
	private String invalidJson;

	@AroundInvoke
	public Object catchRootException(InvocationContext context) {
		try {
			return context.proceed();
		} catch (RootApplicationException e) {
			if (hasInnerException(e)) {
				throw getSpecificDomainException(e);
			} else {
				throw new WebApplicationException(e);
			}
		} catch (JsonGenerationException generationException) {
			throw new WebApplicationException(generationException, Response
					.status(Status.BAD_REQUEST).entity(invalidJson).build());
		} catch (JsonParseException jsonParseException) {
			throw new WebApplicationException(jsonParseException, Response
					.status(Status.BAD_REQUEST).entity(invalidJson).build());
		} catch (JsonMappingException jsonMappingException) {
			throw new WebApplicationException(jsonMappingException, Response
					.status(Status.BAD_REQUEST)
					.entity(jsonMappingException.getMessage()).build());
		} catch (IOException ioException) {
			throw new WebApplicationException(ioException, Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(ioException.getMessage()).build());
		} catch (Exception e) {
			throw new WebApplicationException(e, Response
					.status(Status.INTERNAL_SERVER_ERROR)
					.entity(e.getMessage()).build());
		}
	}

	private boolean hasInnerException(RootApplicationException e) {
		return e.getCause() != null;
	}

	private WebApplicationException getSpecificDomainException(
			RootApplicationException e) {
		Response response = null;
		Throwable specificException = e.getCause();

		if(specificException instanceof NodeNotFoundException) response = Response.status(Status.NOT_FOUND).entity("The given Item is not existing").build();
		else if (specificException instanceof NodeExistsException) response = Response.status(Status.NOT_FOUND).entity("The given Item is not existing").build();
		else if (specificException instanceof NotUniqueException) response = Response.status(Status.BAD_REQUEST).entity("The given Item is not unique").build();
		
		return new WebApplicationException(e, response);
	}
}
