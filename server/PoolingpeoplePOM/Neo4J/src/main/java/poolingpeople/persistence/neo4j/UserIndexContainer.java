package poolingpeople.persistence.neo4j;

public class UserIndexContainer extends IndexContainer{

	public UserIndexContainer(String email, String password){
		super("ALL", email, password);
	}
}





























