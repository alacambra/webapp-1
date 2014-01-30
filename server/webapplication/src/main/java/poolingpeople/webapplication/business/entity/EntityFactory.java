package poolingpeople.webapplication.business.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.ejb.Singleton;
import javax.inject.Inject;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.project.entity.PersistedProject;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.task.entity.PersistedEffort;
import poolingpeople.webapplication.business.task.entity.PersistedTask;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.user.entity.PersistedUser;
import poolingpeople.webapplication.business.user.entity.User;

@Singleton
@EntityPersistenceRollback
public class EntityFactory { 

	@Inject
	private NeoManager manager;

	public void deleteTask(String uuid)  {

		PersistedTask task = getTaskById(uuid);
		task.runDeletePreconditions();
		Set<AbstractPersistedModel<?>> objects = task.loadObjectsToInform();
		manager.removeNode(task.getNode());
		
		for(AbstractPersistedModel<?> model : objects){
			model.updateAll();
		}
			
		
	}

	public PersistedTask getTaskById(String uuid)  {
		return new PersistedTask(manager, uuid);
	}

	public PersistedTask createTask(Task task)  {
		return new PersistedTask(manager, task);
	}

	public List<PersistedTask> getAllTask() {
		return manager.getPersistedObjects(
				manager.getNodes(PersistedTask.NODE_TYPE.name()), 
				new ArrayList<PersistedTask>(), 
				PersistedTask.class);
	}

	public PersistedProject createProject(Project project) {
		return new PersistedProject(manager, project);
	}

	public PersistedProject getProjectById(
			String uuid) {
		return new PersistedProject(manager, uuid);
	}

	public List<PersistedProject> getAllProject() {
		return manager.getPersistedObjects(
				manager.getNodes(PersistedProject.NODE_TYPE.name()), 
				new ArrayList<PersistedProject>(), 
				PersistedProject.class);
	}

	public void deleteProject(String uuid) {
		manager.removeNode(getProjectById(uuid).getNode());
	}

	public User getUserById(String uuid) {
		return new PersistedUser(manager, uuid);
	}

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


	public void deleteUser(String uuid) {
		manager.removeNode(getTaskById(uuid).getNode());

	}

	public List<PersistedUser> getAllUsers() {

		return manager.getPersistedObjects(
				manager.getNodes(PersistedUser.NODE_TYPE.name()), 
				new ArrayList<PersistedUser>(), 
				PersistedUser.class);
	}

	public User createUser(String email, String password, User user) {
		return new PersistedUser(manager, email, password, user);
	}

	public Effort getEffortById(String uuid) {
		return new PersistedEffort(manager, uuid);
	}

	/*
	 * Creating a persisted effort from a transient effort
	 */
	public Effort createEffort(Effort effort) {
		return new PersistedEffort(manager, effort);
	}

}























