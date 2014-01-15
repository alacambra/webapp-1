package poolingpeople.webapplication.business.neo4j;

import poolingpeople.webapplication.business.user.entity.PersistedUser;

public class UserIndexContainer extends IndexContainer{

	public UserIndexContainer(String email, String password){
		super("ALL", email, password);
	}
}





























