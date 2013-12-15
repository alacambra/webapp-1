package poolingpeople.webapplication.business.task.entity;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Singleton;
import javax.inject.Inject;

import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.index.IndexHits;

import poolingpeople.webapplication.business.entity.EntityPersistenceRollback;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.TypeIndexContainer;

@Singleton
@EntityPersistenceRollback
public class EntityFactory { 
	
//	@Inject
	private NeoManager manager;

	public EntityFactory(){}
	
	//TODO who will call this? A test which needs injection but use no CDI  (Albert)
	@Inject
	public EntityFactory(NeoManager manager){
		this.manager = manager;
	}
	
	public void deleteTask(String uuid)  {
		manager.removeNode(getTaskById(uuid).getNode());
	}

	public PersistedTask getTaskById(String uuid)  {
		return new PersistedTask(manager, uuid);
	}
	
	public PersistedTask createTask()  {
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
