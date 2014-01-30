package poolingpeople.webapplication.business.neo4j;

import org.neo4j.graphdb.Label;

/**
 * use {@link Label}s instead
 * @see org.neo4j.graphdb.Label
 * @author alacambra
 *
 */
@Deprecated
public class TypeIndexContainer extends IndexContainer{
	public TypeIndexContainer(PoolingpeopleObjectType type) {
		super("ALL", NodePropertyName.TYPE.name(), type.name());
	}
}





























