package poolingpeople.webapplication.business.task.entity;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;

public class PersistedEffort extends PersistedModel implements Effort{

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.EFFORT;
	
	public PersistedEffort(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	public PersistedEffort(NeoManager manager) throws NodeExistsException {
		super(manager, NODE_TYPE);
	}

	public PersistedEffort(NeoManager manager, String id) throws NotUniqueException,
			NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedEffort() throws NodeExistsException {
		super(NODE_TYPE);
	}

	@Override
	public Long getDate() {
		return manager.getLongProperty(underlyingNode, NodesPropertiesNames.DATE.name());
	}

	@Override
	public void setDate(Long date) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.DATE.name(), date);
		
	}

	@Override
	public String getComment() {
		return manager.getStringProperty(underlyingNode, NodesPropertiesNames.COMMENT.name());
	}

	@Override
	public void setComment(String comment) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.COMMENT.name(), comment);
	}

	@Override
	public Integer getTime() {
		return manager.getIntegerProperty(underlyingNode, NodesPropertiesNames.TIME.name());
	}

	@Override
	public void setTime(Integer time) {
		manager.setProperty(underlyingNode, NodesPropertiesNames.TIME.name(), time);
	}


}
