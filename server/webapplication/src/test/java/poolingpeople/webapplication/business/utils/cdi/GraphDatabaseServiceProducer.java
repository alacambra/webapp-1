package poolingpeople.webapplication.business.utils.cdi;

import javax.annotation.PreDestroy;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;

import org.apache.log4j.Logger;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.test.TestGraphDatabaseFactory;

import poolingpeople.webapplication.business.neo4j.Neo4JSchemaLoader;

@ApplicationScoped
public class GraphDatabaseServiceProducer{

	private GraphDatabaseService graphDb =  new TestGraphDatabaseFactory().newImpermanentDatabase();
	private Logger logger = Logger.getLogger(this.getClass());
	
	
	public GraphDatabaseServiceProducer() {
		logger.info("Using on memory db");
		Neo4JSchemaLoader schemaLoader = new Neo4JSchemaLoader();
		schemaLoader.loadSchema(graphDb);
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



































