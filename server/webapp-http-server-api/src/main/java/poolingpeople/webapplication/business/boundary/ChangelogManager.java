package poolingpeople.webapplication.business.boundary;

import javax.enterprise.event.Observes;
import javax.inject.Inject;

import poolingpeople.commons.entities.EntityFactory;
import poolingpeople.persistence.neo4j.NeoManager;

public class ChangelogManager {

	@Inject
	private EntityFactory entityFactory;
	
	public void onPersistedTaskChange(@Observes UpdateTask updateTask) {
		// ???
	}
}
