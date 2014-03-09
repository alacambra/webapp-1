package poolingpeople.commons.entities;

import java.util.List;

public interface PoolingpeopleEntity {
	String getId();
	List<ChangeLog> getChangeLogList();
	List<Comment> getObjectComments();
}
