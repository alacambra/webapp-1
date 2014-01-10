package poolingpeople.webapplication.business.neo4j.exceptions;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import poolingpeople.webapplication.business.boundary.RootApplicationException;
import poolingpeople.webapplication.business.utils.configuration.boundary.Configurable;

public class NodeNotFoundException extends RootApplicationException {

    @Inject
    @Configurable("doesNotExist")
    private String doesNotExist;
    /**
     *
     */
    private static final long serialVersionUID = -4979887816239892239L;

    @Override
    public Response getSpecificWebResponse() {
        return Response.status(Status.NOT_FOUND).entity(doesNotExist).build();
    }

}
