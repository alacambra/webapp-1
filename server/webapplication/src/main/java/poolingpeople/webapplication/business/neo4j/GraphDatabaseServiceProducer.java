package poolingpeople.webapplication.business.neo4j;

import javax.annotation.PreDestroy;
import javax.ejb.PostActivate;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;

@ApplicationScoped
public class GraphDatabaseServiceProducer{
	private static final GraphDatabaseService graphDb = new GraphDatabaseFactory().newEmbeddedDatabase( "neo4j" );
	
	public GraphDatabaseServiceProducer() {
//		if (graphDb == null)
//			graphDb = new GraphDatabaseFactory().newEmbeddedDatabase("neodb");
	}
	
	@Produces
	public static GraphDatabaseService getGraphDb() {
		return graphDb; 
	}
	
	@PreDestroy
	public void shutdownDb(){
		graphDb.shutdown(); 
		
	}
}



































