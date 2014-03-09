package poolingpeople.webapplication.business.user.boundary;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonSetter;
import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.Comment;
import poolingpeople.commons.entities.Task;
import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;

@JsonIgnoreProperties(ignoreUnknown = true)
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
	@JsonIgnore
	public String getPassword() {
		return null;
	}

	@Override
	@JsonSetter
	public void setPassword(String password) {}

	@Override
	public Long getBirthDate() {
		return null;
	}

	@Override
	public void setBirthDate(Long birthDate) {
		
	}

	@Override
	@JsonIgnore
	public List<Task> getTasks() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void synchronizeWith(User tplObject) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<ChangeLog> getChangeLogList() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Comment> getObjectComments() {
		// TODO Auto-generated method stub
		return null;
	}

}

































































