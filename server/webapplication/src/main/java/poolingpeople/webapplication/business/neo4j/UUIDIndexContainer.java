package poolingpeople.webapplication.business.neo4j;

import java.util.UUID;

public class UUIDIndexContainer extends IndexContainer{
	public UUIDIndexContainer(String uuid) {
		super("ALL", NodesPropertiesNames.ID.name(), uuid);
	}
	
	public UUIDIndexContainer() {
		this(UUID.randomUUID().toString());
	}
}





























