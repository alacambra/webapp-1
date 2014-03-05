package poolingpeople.commons.entities;

import java.util.Set;

public interface PoolingPeopleEntity {
	String getId();
	Set<ChangeLog> getChangeLogSet();
}
