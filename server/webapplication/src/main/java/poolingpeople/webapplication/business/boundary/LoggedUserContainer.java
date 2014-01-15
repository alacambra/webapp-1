package poolingpeople.webapplication.business.boundary;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.user.entity.User;
import scala.annotation.meta.setter;

@RequestScoped
public class LoggedUserContainer {
	
	@Inject
	EntityFactory entityFactory;
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
		user = entityFactory.getUserByCredentials(email, password);
	}
	
	public User getUser() {
		return user;
	}
}

















































































