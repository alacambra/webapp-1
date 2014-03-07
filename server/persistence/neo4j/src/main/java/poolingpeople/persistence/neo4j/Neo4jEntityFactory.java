package poolingpeople.persistence.neo4j;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.ejb.Singleton;
import javax.inject.Inject;

import poolingpeople.commons.cdihelper.InstanceProvider;
import poolingpeople.commons.entities.Effort;
import poolingpeople.commons.entities.EntityFactory;
import poolingpeople.commons.entities.Project;
import poolingpeople.commons.entities.Task;
import poolingpeople.commons.entities.User;
import poolingpeople.persistence.neo4j.entities.AbstractPersistedModel;
import poolingpeople.persistence.neo4j.entities.PersistedEffort;
import poolingpeople.persistence.neo4j.entities.PersistedProject;
import poolingpeople.persistence.neo4j.entities.PersistedTask;
import poolingpeople.persistence.neo4j.entities.PersistedUser;
import poolingpeople.persistence.neo4j.exceptions.NodeNotFoundException;

@Singleton
public class Neo4jEntityFactory implements EntityFactory { 

	@Inject
	private NeoManager manager;

	@Inject
	private InstanceProvider instanceProvider;
	
	@Override
	public void deleteTask(String uuid)  {

		PersistedTask task = getTaskById(uuid);
		task.runDeletePreconditions();
		Set<AbstractPersistedModel<?>> objects = task.loadObjectsToInform();
		manager.removeNode(task.getNode());
		
		for(AbstractPersistedModel<?> model : objects){
			model.updateAll();
		}
	}

	@Override
	public PersistedTask getTaskById(String uuid)  {
		return new PersistedTask(manager, uuid);
	}

	@Override
	public PersistedTask createTask(Task task)  {
		return new PersistedTask(manager, task);
	}

	@Override
	public List<Task> getAllTask() {
		return manager.getPersistedObjects(
					manager.getNodes(PersistedTask.NODE_TYPE.name()), 
					new ArrayList<Task>(), 
					PersistedTask.class, 
					Task.class
				);
	}

	@Override
	public PersistedProject createProject(Project project) {
		return new PersistedProject(manager, project);
	}

	@Override
	public PersistedProject getProjectById(String uuid) {
		return instanceProvider.getInstance(PersistedProject.class).loadExistingNode(uuid, PoolingpeopleObjectType.PROJECT);
	}

	@Override
	public List<Project> getAllProject() {
		return manager.getPersistedObjects(
				manager.getNodes(PersistedProject.NODE_TYPE.name()), 
				new ArrayList<Project>(), 
				PersistedProject.class,
				Project.class);
	}

	@Override
	public void deleteProject(String uuid) {
		manager.removeNode(getProjectById(uuid).getNode());
	}

	@Override
	public User getUserById(String uuid) {
		return new PersistedUser(manager, uuid);
	}

	@Override
	public User getUserByCredentials(String email, String password) {

		try{

			PersistedUser persistedUser = new PersistedUser(manager, email, password);
//			persistedUser.loadByCredentials(email, password);
			
			return persistedUser;
			
		} catch(Exception e) {
			/*
			 * @todo Exception is catched here because if catched in interceptor or directly in the LiggedUSerContainer
			 * provoque unexpected exceptions behavior
			 */
			if (!isNodeNotFoundException(e)){
				throw e;
			}
			
			return null;
		}
	}

	private boolean isNodeNotFoundException(Throwable e){

		if (e instanceof NodeNotFoundException){
			return true;
		}

		Throwable ex = e.getCause();

		while(ex != null) {

			if(ex instanceof NodeNotFoundException) {
				return true;
			}

			ex = ex.getCause();
		}

		return false;

	}


	@Override
	public void deleteUser(String uuid) {
		manager.removeNode(getTaskById(uuid).getNode());

	}

	@Override
	public List<User> getAllUsers() {

		return manager.getPersistedObjects(
				manager.getNodes(PersistedUser.NODE_TYPE.name()), 
				new ArrayList<User>(), 
				PersistedUser.class,
				User.class);
	}

	@Override
	public User createUser(String email, String password, User user) {
		return new PersistedUser(manager, email, password, user);
	}

	@Override
	public Effort getEffortById(String uuid) {
		return new PersistedEffort(manager, uuid);
	}

	/*
	 * Creating a persisted effort from a transient effort
	 */
	@Override
	public Effort createEffort(Effort effort) {
		return new PersistedEffort(manager, effort);
	}
	
	public NeoManager getManager() {
		return manager;
	}

}























