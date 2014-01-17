package poolingpeople.webapplication.business.boundary;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.user.entity.PersistedUser;
import poolingpeople.webapplication.business.user.entity.User;

@RequestScoped
public class LoggedUserContainer {

	@Inject
	private EntityFactory entityFactory;
	private String email;
	private String password;
	private User user;

	public LoggedUserContainer(){}

	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void validateCredentials() {

		user = email == null || password == null ? 
				null : entityFactory.getUserByCredentials(email, password);

	}

	public User getUser() {
		return user;
	}
	
	public boolean userIsSuccessfullyLogged() {
		return user != null;
	}
}



























































































