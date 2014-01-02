package poolingpeople.webapplication.business.logging.it;

import static org.junit.Assert.*;

import javax.inject.Inject;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import poolingpeople.webapplication.business.configuration.boundary.Configurable;
import poolingpeople.webapplication.business.configuration.boundary.ConfigurationProducer;
import poolingpeople.webapplication.business.configuration.control.Configurator;
import poolingpeople.webapplication.business.logging.boundary.LoggerProducer;
import poolingpeople.webapplication.business.logging.boundary.NullableLogger;
import poolingpeople.webapplication.business.logging.boundary.SimpleLogger;
import poolingpeople.webapplication.business.logging.boundary.PPLogger;

@RunWith(Arquillian.class)
public class ItLogging {

	@Inject
	PPLogger whateverLogger;

	@Deployment
	public static JavaArchive createDeployment() {
		return ShrinkWrap
				.create(JavaArchive.class)
				.addClasses(PPLogger.class, NullableLogger.class,
						SimpleLogger.class, LoggerProducer.class,
						ConfigurationProducer.class,Configurable.class,
						Configurator.class)
				.addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
	}
	
	@Test
	public void injectWhateverLogger() {
		assertNotNull(whateverLogger);
	}

	@Test
	public void injectSimpleLogger(){
		assertEquals(SimpleLogger.class, whateverLogger.getClass());
	}
}
