package poolingpeople.webapplication.business.entity;

import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;

import poolingpeople.persistance.neo4j.exceptions.ConsistenceException;
import poolingpeople.persistance.neo4j.exceptions.NodeExistsException;
import poolingpeople.persistance.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.persistance.neo4j.exceptions.NotUniqueException;

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
















