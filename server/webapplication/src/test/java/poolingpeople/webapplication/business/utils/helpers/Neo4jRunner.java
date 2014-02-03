package poolingpeople.webapplication.business.utils.helpers;

import org.junit.runners.BlockJUnit4ClassRunner;
import org.junit.runners.model.FrameworkMethod;
import org.junit.runners.model.InitializationError;
import org.junit.runners.model.Statement;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;
import org.neo4j.test.TestGraphDatabaseFactory;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.utils.cdi.GraphDatabaseServiceProducer;

public class Neo4jRunner extends BlockJUnit4ClassRunner{

	Transaction tx;
	private final GraphDatabaseService graphDb;
	private Object clazz;

	public Neo4jRunner(Class<?> klass) throws InitializationError {
		super(klass);
		GraphDatabaseServiceProducer databaseServiceProducer = new GraphDatabaseServiceProducer();
		graphDb = databaseServiceProducer.getGraphDb();
		this.clazz = klass;
	}

	protected Object createTest() throws Exception {
		Object o = getTestClass().getOnlyConstructor().newInstance();
		o.getClass().getMethod("setManager", NeoManager.class).invoke(o, new NeoManager(graphDb));
		return o;
		
	}

	@Override
	protected Statement methodBlock(final FrameworkMethod method) {
		final Statement defaultStatement = super.methodBlock(method);

		return new Statement() {

			@Override
			public void evaluate() throws Throwable {

				try (Transaction tx = graphDb.beginTx()) {

					defaultStatement.evaluate();
					tx.success();

				}
//				finally {
//					tx.close();
//				}

			}
		};
	}
}
