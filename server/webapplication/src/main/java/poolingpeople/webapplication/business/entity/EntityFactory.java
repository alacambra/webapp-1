package poolingpeople.webapplication.business.entity;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateful;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.index.IndexHits;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.TypeIndexContainer;

@ApplicationScoped
public class EntityFactory { 
	
	@Inject
	private NeoManager manager;

	public EntityFactory(){
		
	}
	
	
//	@Inject
//	public EntityFactory(NeoManager manager){
//		this.manager = manager;
//	}

	public PersistedTask getTask(String uuid) {
		return new PersistedTask(manager, uuid);
	}
	
	public PersistedTask createTask() {
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
