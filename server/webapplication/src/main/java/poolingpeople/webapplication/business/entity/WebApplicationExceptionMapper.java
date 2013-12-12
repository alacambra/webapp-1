package poolingpeople.webapplication.business.entity;


import java.io.IOException;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

@Provider
public class WebApplicationExceptionMapper implements ExceptionMapper<WebApplicationException> {

	protected Logger log = Logger.getLogger(this.getClass());
	ObjectMapper mapper = new ObjectMapper();

	@Override
	public Response toResponse(WebApplicationException exception) {

		log.error("Exception mapped", exception);

		String txt = "";

		if ( exception.getCause() != null ) {
			txt = exception.getCause().getMessage();
		} else {
			txt = (String) exception.getResponse().getEntity();
			ObjectMapper mapper = new ObjectMapper();
			try {
				txt = mapper.writeValueAsString(txt);
			} catch (JsonGenerationException e) {
				txt = "{}";
			} catch (JsonMappingException e) {
				txt = "{}";
			} catch (IOException e) {
				txt = "{}";
			}
		}

		try {
			return Response.status(exception.getResponse().getStatus()).type(MediaType.APPLICATION_JSON).entity(mapper.writeValueAsString(txt)).build();
		} catch (Exception e) {
			return Response.status(exception.getResponse().getStatus()).type(MediaType.APPLICATION_JSON).entity(txt).build();
		}
	}
}