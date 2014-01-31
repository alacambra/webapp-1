package poolingpeople.webapplication.business.boundary;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;

import poolingpeople.webapplication.business.entity.EntityFactory;

@RequestScoped
public class LoggedUserContainerProducer {

	private ILoggedUserContainer loggedUserContainer;
	
	@Inject
	public LoggedUserContainerProducer(EntityFactory entityFactory){
		 loggedUserContainer = new LoggedUserContainer(entityFactory);
	}
	
	@Produces
	public ILoggedUserContainer produceLoggedUserContainer() {
		return loggedUserContainer;
	}
	
}
 