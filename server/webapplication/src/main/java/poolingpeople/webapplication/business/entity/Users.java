package poolingpeople.webapplication.business.entity;

import java.io.Serializable;

import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Users implements Serializable {
	 
	@Id @GeneratedValue()
	private long id;
	private String firstName; 
	private String lastName;
	private String username;
	@OneToOne private Login login;
	@Embedded private Address address;
	private static final long serialVersionUID = 1L;
	public Users() {
		super();
	} 
	   
	public String getFirstName() {
 		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	   
	public String getLastName() {
 		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	   
	public long getId() {
 		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Login getLogin() {
		return login;
	}

	public void setLogin(Login login) {
		this.login = login;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	@Override
	public String toString() {
		return "Users [id=" + id + ", firstName=" + firstName + ", lastName="
				+ lastName + ", username=" + username + ", login=" + login.getId()
				+ ", address=" + address + "]";
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getUsername() {
		return username;
	}
	
   
}
