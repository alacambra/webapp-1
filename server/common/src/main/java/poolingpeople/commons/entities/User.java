package poolingpeople.commons.entities;

import java.util.List;

public interface User {
	
	String getId();

	String getEmail();

//	void setEmail(String email);

	String getFirstName();
	
	void setFirstName(String firstName);
	
	String getLastName();

	void setLastName(String lastname);

	String getPassword();
	void setPassword(String password);
	
	Long getBirthDate();
	void setBirthDate(Long birthDate);

	List<Task> getTasks();

}




























































