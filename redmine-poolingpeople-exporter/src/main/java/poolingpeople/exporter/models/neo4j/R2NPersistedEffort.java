package poolingpeople.exporter.models.neo4j;

import poolingpeople.commons.entities.Effort;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.entities.PersistedEffort;
import poolingpeople.persistence.neo4j.exceptions.NodeExistsException;

public class R2NPersistedEffort extends PersistedEffort implements IsRedmineEntity{

	public R2NPersistedEffort(NeoManager manager, Effort effort)
			throws NodeExistsException {
		
		super(manager, effort);
		
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
