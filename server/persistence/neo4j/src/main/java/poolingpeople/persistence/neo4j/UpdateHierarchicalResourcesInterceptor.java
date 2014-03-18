package poolingpeople.persistence.neo4j;

import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.servlet.http.HttpServletRequest;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;

@Interceptor
@Neo4jTransaction
public class UpdateHierarchicalResourcesInterceptor {

	@Inject
	UpdateQueue updateQueue; 
	
	@AroundInvoke
	public Object logMethod(InvocationContext context) throws Exception {

			Object o = context.proceed();
			updateQueue.executeUpdates();
			return o;
	}
}
