package poolingpeople.webapplication.business.utils.helpers;

import javax.inject.Inject;

import org.neo4j.graphdb.Transaction;

import poolingpeople.commons.entities.User;
import poolingpeople.webapplication.business.boundary.ILoggedUserContainer;
import poolingpeople.webapplication.business.entity.EntityFactory;
import poolingpeople.webapplication.business.neo4j.entities.PersistedUser;
import poolingpeople.webapplication.business.user.boundary.UserDTO;

public class LoggedUserContainer implements ILoggedUserContainer {

	private EntityFactory entityFactory;
	private String email;
	private String password;
	private User user;

	@Inject
	public LoggedUserContainer(EntityFactory entityFactory){

		this.entityFactory = entityFactory;
		Transaction tx = entityFactory.getManager().getGraphDbService().beginTx();
		try{
			email = "a@a.cat";
			password = "aaaa";

			validateCredentials();

			if (!userIsSuccessfullyLogged()) {

				UserDTO dto = new UserDTO(); 
				dto.setEmail(email);
				dto.setPassword(password);

				user = new PersistedUser(entityFactory.getManager(), email, password, dto);
				tx.success();
			}
		} finally {
			tx.close();
		}
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getEmail() {
		return email;
	}

	@Override
	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public void validateCredentials() {

		user = email == null || password == null ? 
				null : entityFactory.getUserByCredentials(email, password);

	}

	@Override
	public User getUser() {
		return user;
	}

	@Override
	public boolean userIsSuccessfullyLogged() {
		return user != null;
	}
}



























































































