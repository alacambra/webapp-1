package poolingpeople.webapplication.business.entity;

import org.junit.After;
import org.junit.runner.RunWith;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Transaction;
import org.neo4j.tooling.GlobalGraphOperations;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.UUIDIndexContainer;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;
import poolingpeople.webapplication.business.utils.helpers.Neo4jRunner;

@RunWith(Neo4jRunner.class)
public abstract class AbstractPersitanceTest {
	protected String structurePath = "cypher-graphs/";
	
	protected NeoManager manager;
	protected Transaction tx;
	
	public void setManager(NeoManager manager) {
		this.manager = manager;
	}

	protected void addCypherStructure(String cypherStructure){
		manager.runCypherQuery(FileLoader.getText(structurePath + cypherStructure), null);
		Iterable<Node> iterable = GlobalGraphOperations.at(manager.getGraphDbService()).getAllNodes();
		for(Node n : iterable) {
			manager.addToIndex(n, new UUIDIndexContainer((String) n.getProperty("ID")));
		}
	}
	
	@After
	public void tearDown() {
		Iterable<Node> iterable = GlobalGraphOperations.at(manager.getGraphDbService()).getAllNodes();
		for(Node n : iterable) {
			manager.removeNode(n);
		}
	}
}
