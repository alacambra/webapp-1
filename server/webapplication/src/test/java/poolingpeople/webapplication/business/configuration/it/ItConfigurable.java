package poolingpeople.webapplication.business.configuration.it;

import javax.inject.Inject;

import poolingpeople.webapplication.business.configuration.boundary.Configurable;

public class ItConfigurable {

	@Inject @Configurable("isLogging") boolean isLogging;
	@Inject @Configurable("test") String testString;
	@Inject @Configurable("NOT_VALID_KEY") int notValidKey;
}
