package poolingpeople.persistence.neo4j; 

import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import org.apache.log4j.Logger;

@Interceptor
@Neo4jProfiler
public class ProfilerInterceptor {

	Logger logger = Logger.getLogger(this.getClass());

	@AroundInvoke
	public Object profileMethod(InvocationContext context) throws Exception {

			Long start = System.nanoTime();
			Object o = context.proceed();
			Long total = System.nanoTime() - start;
			logger.debug(context.getMethod().getName() + " : " + total + " : ns");
			return o;
	}
}
