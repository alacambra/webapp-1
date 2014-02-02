package poolingpeople.webapplication.business.neo4j;

import javax.annotation.PreDestroy;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;

@ApplicationScoped
public class GraphDatabaseServiceProducer{

	private final static String db_uri = "neo4j";
	private final GraphDatabaseService graphDb = new GraphDatabaseFactory().newEmbeddedDatabase( db_uri );
	
	public GraphDatabaseServiceProducer() {
		new Neo4JSchemaLoader().loadSchema(graphDb);
	}
	
	@Produces
	public GraphDatabaseService getGraphDb() {
		return graphDb; 
	}
	
	@PreDestroy
	public void shutdownDb(){
		graphDb.shutdown(); 
	}
}



































