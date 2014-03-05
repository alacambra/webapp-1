package poolingpeople.exporter.models.neo4j;

import poolingpeople.commons.entities.Project;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.entities.PersistedProject;

public class R2NPersistedProject extends PersistedProject implements IsRedmineEntity{

	public R2NPersistedProject(NeoManager manager, Project project) {
		super(manager, project);
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