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

import poolingpeople.webapplication.business.utils.configuration.boundary.Configurable;

//TODO: test this interceptor via CDI Bean testing concept (in Sprint 1)
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
            throw getSpecificDomainException(e);
        } catch (JsonGenerationException | JsonParseException generationException) {
            throw new WebApplicationException(generationException, Response
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
    
    private WebApplicationException getSpecificDomainException(
            RootApplicationException exception) {
        return new WebApplicationException(exception, exception.getSpecificWebResponse());
    }
}
