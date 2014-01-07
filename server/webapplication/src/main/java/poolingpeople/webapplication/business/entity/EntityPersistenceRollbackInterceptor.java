package poolingpeople.webapplication.business.entity;

import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;

import poolingpeople.webapplication.business.boundary.RootApplicationException;
import poolingpeople.webapplication.business.neo4j.ConsistenceException;
import poolingpeople.webapplication.business.neo4j.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.NotUniqueException;

@Interceptor
@EntityPersistenceRollback
public class EntityPersistenceRollbackInterceptor {

	@AroundInvoke
	public Object handleException(InvocationContext context) throws Exception {
		try {
			return context.proceed();
		} catch (    NodeNotFoundException | NodeExistsException | NotUniqueException | ConsistenceException ex) {
			throw ex;
		}
	}

}
