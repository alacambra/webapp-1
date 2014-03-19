package poolingpeople.persistence.neo4j.entities;

import javax.enterprise.event.Observes;

public class ChangelogManager {

	public void onPersistedTaskChange(@Observes PersistedTask persistedTask) {
		
	}
}
