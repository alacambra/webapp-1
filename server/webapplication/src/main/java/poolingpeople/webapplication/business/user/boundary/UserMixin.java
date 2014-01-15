package poolingpeople.webapplication.business.user.boundary;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.user.entity.User;

public class UserMixin implements User{

	
	@JsonIgnore
	public Node getNode() {
		return null;
	}
	
	@JsonIgnore
	public PoolingpeopleObjectType getNodeType() {
		return null;
	}

	@Override
	public String getId() {
		return null;
	}

	@Override
	public String getEmail() {
		return null;
	}

//	@Override
//	public void setEmail(String email) {}

	@Override
	public String getFirstName() {
		return null;
	}

	@Override
	public void setFirstName(String firstName) {}

	@Override
	public String getLastName() {
		return null;
	}

	@Override
	public void setLastName(String lastname) {}

	@Override
	public String getPassword() {
		return null;
	}

	@Override
	public void setPassword(String password) {}

}
