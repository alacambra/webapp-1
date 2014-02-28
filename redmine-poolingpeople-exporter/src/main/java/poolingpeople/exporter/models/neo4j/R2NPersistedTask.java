package poolingpeople.exporter.models.neo4j;

import poolingpeople.commons.entities.Task;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.entities.PersistedTask;

public class R2NPersistedTask extends PersistedTask implements IsRedmineEntity{

	public R2NPersistedTask(NeoManager manager, Task task) {
		super(manager, task);
	}

	@Override
	public void setRedmineId(Integer id) {
		setProperty(NodePropertyName.REDMINE_ID, id);
	}

	@Override
	public Integer getRedmineId() {
		return getIntegerProperty(NodePropertyName.REDMINE_ID);
	}
}