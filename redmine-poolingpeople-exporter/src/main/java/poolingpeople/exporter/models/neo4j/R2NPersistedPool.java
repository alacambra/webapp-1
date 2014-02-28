package poolingpeople.exporter.models.neo4j;

import org.neo4j.graphdb.Node;

import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.entities.PersistedProject;

public class R2NPersistedPool extends PersistedProject implements IsRedmineEntity{

	public R2NPersistedPool(NeoManager manager, Node node) {
		super(manager, node);
		// TODO Auto-generated constructor stub
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
