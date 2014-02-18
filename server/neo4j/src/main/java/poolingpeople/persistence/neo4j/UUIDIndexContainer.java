package poolingpeople.persistence.neo4j;

import java.util.UUID;

public class UUIDIndexContainer extends IndexContainer{
	public UUIDIndexContainer(String uuid) {
		super("ALL", NodePropertyName.ID.name(), uuid);
	}
	
	public UUIDIndexContainer() {
		this(UUID.randomUUID().toString());
	}
}





























