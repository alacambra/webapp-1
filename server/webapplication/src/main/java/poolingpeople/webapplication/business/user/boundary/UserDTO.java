package poolingpeople.webapplication.business.user.boundary;

import poolingpeople.webapplication.business.utils.validation.EmailValidation;
import poolingpeople.webapplication.business.entity.IgnoreAttribute;
import poolingpeople.webapplication.business.user.entity.User;

public class UserDTO implements User {

	private String id;
	private String email;
	private String firstName;
	private String lastName;
	private String password;
	private Long birthDate;

	@IgnoreAttribute
	@Override
	public String getId() {
		return id;
	}

	@EmailValidation
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Long getBirthDate() {
		return birthDate;
	}
	
	public void setBirthDate(Long birthDate) {
		this.birthDate = birthDate;
	}
}
