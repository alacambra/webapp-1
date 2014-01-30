package poolingpeople.webapplication.business.boundary;

import poolingpeople.webapplication.business.user.entity.User;

public interface ILoggedUserContainer {

	String getPassword();

	String getEmail();

	void setPassword(String password);

	void setEmail(String email);

	void validateCredentials();

	User getUser();

	boolean userIsSuccessfullyLogged();

}