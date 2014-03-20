package poolingpeople.webapplication.business.boundary;

import javax.enterprise.event.Observes;

import poolingpeople.persistence.neo4j.entities.PersistedTask;

public class ChangelogManager {

	public void onPersistedTaskChange(@Observes PersistedTask persistedTask) {
		
	}
}
