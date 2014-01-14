package poolingpeople.webapplication.business.neo4j.exceptions;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import poolingpeople.webapplication.business.boundary.RootApplicationException;
import poolingpeople.webapplication.business.utils.configuration.boundary.Configurable;

public class NotUniqueException extends RootApplicationException {

    @Inject
    @Configurable("doesNotExist")
    private String doesNotExist;

    /**
     *
     */
    private static final long serialVersionUID = -293381679679028746L;

    @Override
    public Response getSpecificWebResponse() {
        return Response.status(Status.BAD_REQUEST).entity(doesNotExist).build();
    }

}
