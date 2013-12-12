package poolingpeople.webapplication.business.entity;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateful;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.index.IndexHits;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.TypeIndexContainer;
import scala.annotation.meta.getter;

@ApplicationScoped
public class EntityFactory { 
	
	@Inject
	private NeoManager manager;

	public EntityFactory(){}
	
	public EntityFactory(NeoManager manager){
		this.manager = manager;
	}
	
	public void deleteTask(String uuid) throws NotUniqueException, NodeNotFoundException {
		manager.removeNode(getTask(uuid).getNode());
	}
	
	
//	@Inject
//	public EntityFactory(NeoManager manager){
//		this.manager = manager;
//	}

	public PersistedTask getTask(String uuid) throws NotUniqueException, NodeNotFoundException {
		return new PersistedTask(manager, uuid);
	}
	
	public PersistedTask createTask() throws NodeExistsException {
		return new PersistedTask(manager);
	}

	public List<PersistedTask> getAllTask() {
		IndexHits<Node> nodes = manager.getNodes(new TypeIndexContainer(PersistedTask.NODE_TYPE));
		List<PersistedTask> tasks = new ArrayList<PersistedTask>();
		
		for(Node n : nodes){
			tasks.add(new PersistedTask(manager, n));
		}
		
		return tasks;
	}
}
