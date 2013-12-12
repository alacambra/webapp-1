package poolingpeople.webapplication.business.neo4j;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;

@Interceptor
@Neo4jTransaction
public class TransactionInterceptor {

	@Inject
	GraphDatabaseService databaseService; 

	@AroundInvoke
	public Object logMethod(InvocationContext context) throws Exception {

		Transaction tx = databaseService.beginTx();

		try {
			Object o = context.proceed();
			tx.success();
			return o;
		} catch (Exception e) {
			System.err.println(e);
			tx.failure();
			throw e;
		} finally {
			tx.close();
		}
	}
}
