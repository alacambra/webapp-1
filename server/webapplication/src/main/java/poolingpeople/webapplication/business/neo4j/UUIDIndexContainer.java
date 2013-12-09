package poolingpeople.webapplication.business.neo4j;

public class UUIDIndexContainer extends IndexContainer{
	public UUIDIndexContainer(String uuid) {
		super("ALL", NodesPropertiesNames.ID.name(), uuid);
	}
}





























