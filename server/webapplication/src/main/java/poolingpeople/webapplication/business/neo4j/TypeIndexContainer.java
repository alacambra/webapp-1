package poolingpeople.webapplication.business.neo4j;

public class TypeIndexContainer extends IndexContainer{
	public TypeIndexContainer(PoolingpeopleObjectType type) {
		super("ALL", NodesPropertiesNames.TYPE.name(), type.name());
	}
}





























