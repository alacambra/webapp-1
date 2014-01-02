package poolingpeople.webapplication.business.configuration.it;

import static org.junit.Assert.*;

import javax.inject.Inject;

import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.JavaArchive;
import org.junit.Test;
import org.junit.runner.RunWith;

import poolingpeople.webapplication.business.utils.configuration.boundary.ConfigurationProducer;
import poolingpeople.webapplication.business.utils.configuration.boundary.Configurator;

@RunWith(Arquillian.class)
public class ItConfiguration {

	@Inject
	ItConfigurable configurable;

	@Deployment
	public static JavaArchive createDeployment() {
		return ShrinkWrap
				.create(JavaArchive.class)
				.addClasses(ItConfigurable.class, ConfigurationProducer.class,Configurator.class)
				.addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml");
	}

	@Test
	public void injectItconfigurable() {
		assertNotNull(configurable);
	}
	
	@Test
	public void injectBoolean() {
		assertEquals(true, configurable.isLogging);
	}

	@Test
	public void injectString(){
		assertEquals("asdf", configurable.testString);
	}
	
	@Test
	public void injectNotValidKey(){
		assertEquals(0,configurable.notValidKey);
	}
}