package poolingpeople.webapplication.business.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Login implements Serializable {

	@Id @GeneratedValue
	private long id;
	private String email; 
	private String password; 
	private String confirmationLink; 
	private boolean isConfirmed;
	@OneToOne private Users user;
	private static final long serialVersionUID = 1L;	
	public Login() {
		super();
	} 
	   
	public String getEmail() {
 		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	   
	public String getPassword() {
 		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	   
	public String getConfirmationLink() {
 		return this.confirmationLink;
	}

	public void setConfirmationLink(String confirmationLink) {
		this.confirmationLink = confirmationLink;
	}
	   
	public boolean getIsConfirmed() {
 		return this.isConfirmed;
	}

	public void setIsConfirmed(boolean isConfirmed) {
		this.isConfirmed = isConfirmed;
	}
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Login [id=" + id + ", email=" + email + ", password=####"
				 + ", confirmationLink=" + confirmationLink
				+ ", isConfirmed=" + isConfirmed + ", user=" + user.getId() + "]";
	}
   
}
