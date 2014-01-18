package poolingpeople.webapplication.business.entity;

import javax.inject.Inject;

import org.codehaus.jackson.map.ObjectMapper;
import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.CdiRunner;
import org.junit.runner.RunWith;

import poolingpeople.webapplication.business.boundary.CatchWebExceptionInterceptor;
import poolingpeople.webapplication.business.boundary.ObjectMapperProducer;
import poolingpeople.webapplication.business.neo4j.TransactionInterceptor;
import poolingpeople.webapplication.business.utils.cdi.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.utils.configuration.boundary.ConfigurationProducer;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;
import poolingpeople.webapplication.business.utils.helpers.RestObjectsHelper;

@RunWith(CdiRunner.class)
@AdditionalClasses({
	ObjectMapperProducer.class, 
	GraphDatabaseServiceProducer.class, 
	TransactionInterceptor.class, 
	CatchWebExceptionInterceptor.class,
	ConfigurationProducer.class
})
public abstract class AbstractTest {
	
	@Inject
	protected FileLoader fileLoader;

	@Inject
	protected RestObjectsHelper restObjectsHelper;

	protected ObjectMapper mapper = new ObjectMapper();


}
