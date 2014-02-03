package poolingpeople.webapplication.business.user.entity;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;

import poolingpeople.webapplication.business.task.entity.Task;

public interface User {
	
	String getId();

	String getEmail();

//	void setEmail(String email);

	String getFirstName();
	
	void setFirstName(String firstName);
	
	String getLastName();

	void setLastName(String lastname);

	@JsonIgnore
	String getPassword();

	@JsonProperty
	void setPassword(String password);
	
	Long getBirthDate();
	void setBirthDate(Long birthDate);

	List<Task> getTasks();

}




























































