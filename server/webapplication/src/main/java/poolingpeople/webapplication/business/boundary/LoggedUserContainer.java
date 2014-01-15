package poolingpeople.webapplication.business.boundary;

import javax.inject.Inject;

import poolingpeople.webapplication.business.entity.EntityFactory;

public class LoggedUserContainer {
	
	@Inject
	EntityFactory entityFactory;
	
	public LoggedUserContainer(String email, String password){
		
	}

}
