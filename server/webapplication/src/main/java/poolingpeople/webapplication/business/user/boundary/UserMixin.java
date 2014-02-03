package poolingpeople.webapplication.business.user.boundary;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonValue;
import org.codehaus.jackson.map.annotate.JsonView;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.boundary.JsonViews;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.user.entity.User;

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
	@JsonView(JsonViews.NeverUsed.class)
	public String getPassword() {
		return null;
	}

	@Override
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

}

































































