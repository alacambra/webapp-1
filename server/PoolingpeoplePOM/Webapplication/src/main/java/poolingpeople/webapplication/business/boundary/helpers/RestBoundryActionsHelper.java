package poolingpeople.webapplication.business.boundary.helpers;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.neo4j.graphdb.Node;

import poolingpeople.persistence.neo4j.Neo4jTransaction;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.entities.PersistedProject;

@Path("help")
@Stateless
@Neo4jTransaction
public class RestBoundryActionsHelper {
	
	@Inject NeoManager manager;
	
	@DELETE
	@Path("projects")
	public Response deleteAllProjects() {
		for (Node n : manager.getNodes(PersistedProject.NODE_TYPE.name())){
			n.delete();
		}
		return Response.noContent().build();
	}
}
