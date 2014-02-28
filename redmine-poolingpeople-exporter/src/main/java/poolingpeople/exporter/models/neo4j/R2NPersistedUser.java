package poolingpeople.exporter.models.neo4j;

import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.entities.PersistedUser;

public class R2NPersistedUser extends PersistedUser implements IsRedmineEntity{

	public R2NPersistedUser(NeoManager manager, String email, String password, User user) {
		super(manager, email, password, user);
	}

	@Override
	public void setRedmineId(Integer id) {
		setProperty(NodePropertyName.REDMINE_ID, id);
	}

	@Override
	public Integer getRedmineId() {
		return getIntegerProperty(NodePropertyName.REDMINE_ID);
	}
	
}
