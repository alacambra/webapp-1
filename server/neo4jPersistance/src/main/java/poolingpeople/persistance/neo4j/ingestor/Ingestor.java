package poolingpeople.persistance.neo4j.ingestor;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.neo4j.graphdb.Transaction;

import poolingpeople.commons.entities.ProjectStatus;
import poolingpeople.commons.entities.TaskStatus;
import poolingpeople.persistance.neo4j.GraphDatabaseServiceProducer;
import poolingpeople.persistance.neo4j.NeoManager;
import poolingpeople.persistance.neo4j.entities.PersistedEffort;
import poolingpeople.persistance.neo4j.entities.PersistedProject;
import poolingpeople.persistance.neo4j.entities.PersistedTask;
import poolingpeople.persistance.neo4j.entities.PersistedUser;
import poolingpeople.persistance.neo4j.ingestor.redmine.Issues;
import poolingpeople.persistance.neo4j.ingestor.redmine.Projects;
import poolingpeople.persistance.neo4j.ingestor.redmine.TimeEntries;
import poolingpeople.persistance.neo4j.ingestor.redmine.Users;

public class Ingestor {

	public static void main(String[] args){

		GraphDatabaseServiceProducer producer = new GraphDatabaseServiceProducer();
		NeoManager manager = new NeoManager(producer.getGraphDb());
		
		Logger logger = Logger.getLogger(Ingestor.class);

		//User - Users
		//Project - projects
		//Task - issues
		//Effort - time entries

		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();
		Map<Integer, Users> users = getItems(session, Users.class);
		Map<Integer, Projects> projects = getItems(session, Projects.class);
		Map<Integer, Issues> issues = getItems(session, Issues.class);
		Map<Integer, TimeEntries> entries = getItems(session, TimeEntries.class);

		Map<String, PersistedUser> persistedUsers = new HashMap<String, PersistedUser>();
		Map<Integer, String> userIds = new HashMap<Integer, String>();
		Map<Integer, String> projectsIds = new HashMap<Integer, String>();
		Map<Integer, String> tasksIds = new HashMap<Integer, String>();
		Map<Integer, String> effortsIds = new HashMap<Integer, String>();
		Map<String, PersistedProject> persistedProjects = new HashMap<String, PersistedProject>();
		Map<String, PersistedTask> persistedTasks = new HashMap<String, PersistedTask>();
		Map<String, PersistedEffort> persistedEfforts = new HashMap<String, PersistedEffort>();

		try ( Transaction tx = manager.getGraphDbService().beginTx() )
		{
			logger.error("Users.......................");
			loadDefaultUser(manager);

			for( Entry<Integer, Users> u : users.entrySet() ){

				PersistedUser pu = new PersistedUser(manager, getEmail(u.getValue()), "a", new FakedUser());
				pu.setFirstName(u.getValue().getFirstname());
				persistedUsers.put(pu.getId(), pu);
				userIds.put(u.getKey(), pu.getId());

			}

			logger.error("Projects.......................");
			for( Entry<Integer, Projects> p : projects.entrySet() ){

				PersistedProject pp = new PersistedProject(manager, new FakedProject());
				pp.setDefaultStartDate(p.getValue().getCreatedOn().getTime());
				pp.setDescription(p.getValue().getDescription());
				pp.setStatus(getProjectStatus(p.getValue().getStatus()));
				pp.setTitle(p.getValue().getName());
				persistedProjects.put(pp.getId(), pp);
				projectsIds.put(p.getKey(), pp.getId());

			}

			logger.error("Tasks.......................");
			for( Entry<Integer, Issues> t : issues.entrySet() ){

				PersistedTask pt = new PersistedTask(manager, new FakedTask());
				pt.setDefaultStartDate(t.getValue().getCreatedOn().getTime());
				pt.setDescription(t.getValue().getDescription());
				pt.setStatus(getTaskStatus(t.getValue().getStatusId()));
				pt.setTitle(t.getValue().getSubject());
				persistedTasks.put(pt.getId(), pt);
				tasksIds.put(t.getKey(), pt.getId());

			}

			logger.error("Efforts.......................");
			for( Entry<Integer, TimeEntries> te : entries.entrySet() ){

				PersistedTask task = persistedTasks.get(tasksIds.get(te.getValue().getIssueId()));
				
				if (task == null){
					
					logger.error("Skiping entry without task");
					continue;
					
				}
				
				PersistedEffort effort = new PersistedEffort(manager, new FakedEffort());
				task.addEffort(effort);
				
				effort.setComment(te.getValue().getComments());
				effort.setDate(te.getValue().getCreatedOn().getTime());
				effort.setTime(Math.round(te.getValue().getHours()));
				persistedEfforts.put(effort.getId(), effort);
				effortsIds.put(te.getKey(), effort.getId());

			}

//			for( Entry<Integer, Projects> p : projects.entrySet() ){
//				persistedProjects.get(projectsIds.get(p.getKey())).addTask(persistedTasks.get(tasksIds.get(key));
//			}
			
			for(Entry<Integer, Issues> t : issues.entrySet()){
				PersistedProject pp = persistedProjects.get(projectsIds.get(t.getValue().getProjectId()));
				if (pp == null){
					continue;
				}
				PersistedTask task = persistedTasks.get(tasksIds.get(t.getKey()));
				pp.addTask(task);
				
				PersistedTask parent = persistedTasks.get(tasksIds.get(t.getValue().getParentId()));
				if (parent == null){
					continue;
				}
			}
			
			session.getTransaction().commit();
		}
	}

	public static PersistedUser loadDefaultUser(NeoManager manager){
		PersistedUser pu = new PersistedUser(manager, "a@a.com", "a", new FakedUser());
		pu.setFirstName("DefaultUser");
		pu.setPassword("a");
		return pu;
	}

	public static <T extends HasId> Map<Integer, T> getItems(Session session, Class<T> clazz) {

		Criteria criteria = session.createCriteria(clazz);
		List<T> resource = criteria.list();

		HashMap<Integer, T> set = new HashMap<>();

		for(T r : resource){
			set.put(r.getId(), r);
		}

		return set;
	}

	public static ProjectStatus getProjectStatus(int status){
		switch(status){
		case 1:
			return ProjectStatus.NEW;
		case 5:
			return ProjectStatus.COMPLETED;
		case 9:
			return ProjectStatus.ARCHIVED;

		default:
			return ProjectStatus.NEW;
		}
	}
	
	public static String getEmail(Users redmineUser) {
		return redmineUser.getMail() == null || "".equals(redmineUser.getMail()) ? String.valueOf(new Date().getTime()) + "@s.com" : redmineUser.getMail();
	}

	public static TaskStatus getTaskStatus(int status){
		switch(status){
		case 1:
			return TaskStatus.NEW;
		case 5:
			return TaskStatus.COMPLETED;
		case 9:
			return TaskStatus.ARCHIVED;

		default:
			return TaskStatus.NEW;
		}
	}
}


































