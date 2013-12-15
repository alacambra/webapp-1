package poolingpeople.webapplication.business.neo4j;

import javax.annotation.PreDestroy;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;

//@ApplicationScoped
public class GraphDatabaseServiceProducer{
	private static final GraphDatabaseService graphDb = new GraphDatabaseFactory().newEmbeddedDatabase( "neo4j" );
	
	public GraphDatabaseServiceProducer() {}
	
//	@Produces
	public static GraphDatabaseService getGraphDb() {
		return graphDb; 
	}
	
//	@PreDestroy
	public void shutdownDb(){
		graphDb.shutdown(); 
		
	}
}



































