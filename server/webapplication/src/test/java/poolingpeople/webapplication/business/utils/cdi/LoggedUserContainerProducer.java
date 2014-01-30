package poolingpeople.webapplication.business.utils.cdi;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;

import poolingpeople.webapplication.business.boundary.ILoggedUserContainer;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.utils.helpers.LoggedUserContainer;

@ApplicationScoped
public class LoggedUserContainerProducer {

	@Inject
	private EntityFactory entityFactory;
	
	@Produces
	public ILoggedUserContainer produceLoggedUserContainer() {
		return new LoggedUserContainer(entityFactory);
	}
	
}
