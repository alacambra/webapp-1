package poolingpeople.webapplication.business.entity;

import java.io.Serializable;

import javax.persistence.Embeddable;

@Embeddable
public class Address implements Serializable {

	private String street; 
	private String city; 
	private String zipCode;
	private String state;
	private String country; 
	private static final long serialVersionUID = 1L;	
	public Address() {
		super();
	} 
	   
	public String getStreet() {
 		return this.street;
	}

	public void setStreet(String street) {
		this.street = street;
	}
	   
	public String getCity() {
 		return this.city;
	}

	public void setCity(String city) {
		this.city = city;
	}
	   
	public String getCountry() {
 		return this.country;
	}

	public void setCountry(String country) {
		this.country = country;
	}
	   
	public String getState() {
 		return this.state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPostalCode() {
		return zipCode;
	}

	public void setPostalCode(String postalCode) {
		this.zipCode = postalCode;
	}

	@Override
	public String toString() {
		return "Address [street=" + street + ", city=" + city + ", country="
				+ country + ", state=" + state + ", postalCode=" + zipCode
				+ "]";
	}
	
   
}
