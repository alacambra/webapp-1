package poolingpeople.webapplication.business.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;
import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.CdiRunner;
import org.junit.runner.RunWith;

import poolingpeople.webapplication.business.boundary.CatchWebExceptionInterceptor;
import poolingpeople.webapplication.business.boundary.ObjectMapperProducer;
import poolingpeople.webapplication.business.neo4j.TransactionInterceptor;
import poolingpeople.webapplication.business.project.boundary.ProjectBoundary;
import poolingpeople.webapplication.business.task.boundary.EffortBoundry;
import poolingpeople.webapplication.business.task.boundary.TaskBoundary;
import poolingpeople.webapplication.business.user.boundary.UserBoundary;
import poolingpeople.webapplication.business.utils.cdi.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.utils.configuration.boundary.ConfigurationProducer;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;
import poolingpeople.webapplication.business.utils.helpers.RestObjectsHelper;
import poolingpeople.webapplication.business.utils.helpers.RestObjectsHelper.EffortWithTaskContainer;
import poolingpeople.webapplication.business.utils.validation.EmailValidation;

@RunWith(CdiRunner.class)
@AdditionalClasses({
	ObjectMapperProducer.class, 
	GraphDatabaseServiceProducer.class, 
	TransactionInterceptor.class, 
	CatchWebExceptionInterceptor.class,
	ConfigurationProducer.class,
	EmailValidation.class
})
/*
 * dependency problem, probably because Validators
 */
public abstract class AbstractTest {

	@Inject
	protected FileLoader fileLoader;

	@Inject
	protected RestObjectsHelper restObjectsHelper;

	protected ObjectMapper mapper = new ObjectMapper();

	/*
	 * From hier is helepr. New struct test
	 */
	Logger logger = Logger.getLogger(this.getClass());

	@Inject
	TaskBoundary taskBoundary;

	@Inject
	EffortBoundry effortBoundary;
	
	@Inject
	ProjectBoundary projectBoundary;
	
	@Inject 
	UserBoundary userBoundary;


	protected <K,V> Map<K,V> getTask(String uuid) {

		Response r;

		try {
			r = taskBoundary.getTaskById(uuid);
			Map<K,V> ret = convertJsonToMap((String)r.getEntity());
			return ret;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	protected <K,V> Map<K,V> getEffort(String uuid) {

		Response r;

		try {
			r = effortBoundary.getEffort(uuid);
			Map<K,V> ret = convertJsonToMap((String)r.getEntity());
			return ret;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}
	
	protected Map<String, Object> insertProjectFromFile(String filename) {
		String json = FileLoader.getText(filename);
		return insertProjectFromJson(json);
	}
	
	protected <K,V> Map<K,V> insertProjectFromJson(String json) {

		try {

			Response r = projectBoundary.saveProject(json);
			Map<K,V> ret = convertJsonToMap((String)r.getEntity());
			return ret;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}
	
	protected Map<String, Object> insertUserFromFile(String filename) {
		String json = FileLoader.getText(filename);
		return insertUserFromJson(json);
	}
	
	protected <K,V> Map<K,V> insertUserFromJson(String json) {

		try {

			Response r = userBoundary.saveUser(json);
			Map<K,V> ret = convertJsonToMap((String)r.getEntity());
			return ret;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	protected <K,V> Map<K,V> insertTaskFromFile(String filename) {

		String json = FileLoader.getText(filename);
		return insertTaskFromJson(json);

	}

	protected <K,V> Map<K,V> insertTaskFromJson(String json) {

		try {

			Response r = taskBoundary.saveTask(json);
			Map<K,V> ret = convertJsonToMap((String)r.getEntity());
			return ret;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	protected <K,V> EffortWithTaskContainer<K,V> insertEffortFromFile(String filename) {

		String json = FileLoader.getText(filename);
		return insertEffortFromJson(json);

	}

	protected <K,V> EffortWithTaskContainer<K,V> insertEffortFromJson(String json, Map<String,String> task) {

		try {
			Response r = effortBoundary.saveEffort(task.get("id"), json);
			Map<K,V> ret = convertJsonToMap((String)r.getEntity());
			return new EffortWithTaskContainer(task, ret);

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	protected <K,V> EffortWithTaskContainer<K,V> insertEffortFromJson(String json) {
		Map<String,String> task = insertTaskFromFile("task-create-request.json");
		return insertEffortFromJson(json, task);
	}

	protected <K,V> Map<K,V> convertJsonToMap(String json) {
		try {

			Map<K,V> data = mapper.readValue(json, Map.class);
			return data;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	protected <K,V> Map<K,V> convertJsonFileToMap(String filename) {
		String json = FileLoader.getText(filename);
		return convertJsonToMap(json);
	}
	
	protected List<Map<String, Object>> createProjectListFromProjectFile(String projectRequestFile, int num) {
		List<Map<String, Object>> projects = new ArrayList<Map<String, Object>>();

		for (int i = 0; i<num; i++ ) {
			Map<String, Object> created = insertProjectFromFile(projectRequestFile);
			projects.add(created);
		}

		return projects;
	}
	
	protected List<Map<String, Object>> createUserListFromUserFile(String userRequestFile, int num) {
		List<Map<String, Object>> users = new ArrayList<Map<String, Object>>();

		for (int i = 0; i<num; i++ ) {
			Map<String, Object> created = insertUserFromFile(userRequestFile);
			users.add(created);
		}

		return users;
	}

	protected <K,V> List<Map<K,V>> createTaskListFromTaskFile(String filename, int num) {

		List<Map<K,V>> tasks = new ArrayList<Map<K,V>>();

		for (int i = 0; i<num; i++ ) {
			Map<K,V> created = insertTaskFromFile(filename);
			tasks.add(created);
		}

		return tasks;
	}

	protected <K,V> EffortWithTaskContainer<K,V> createEffortListFromEffortFile(String filename, int num) {

		List<Map<K,V>> efforts = new ArrayList<Map<K,V>>();

		EffortWithTaskContainer<K, V> container = insertEffortFromFile(filename);

		Map<K,V> created = container.getEffort();
		efforts.add(created);

		for (int i = 0; i<num; i++ ) {

			container = insertEffortFromJson(FileLoader.getText(filename), (Map<String, String>) container.getTask());
			created = container.getEffort();
			efforts.add(created);
		}

		return new EffortWithTaskContainer(container.getTask(), efforts);
	}

	protected <K,V> String convertMapToJson(Map<K,V> map) {

		try {
			return mapper.writeValueAsString(map);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}


	protected <K,V> boolean mapsAreEquals(Map<K,V> m1, Map<K,V> m2) {

		if ( m1.size() != m2.size()) {
			logger.info("Map size does not match.");
			return false;
		}

		for(Object k1 : m1.keySet()) {
			if (!m2.containsKey(k1) || !m1.get(k1).equals(m2.get(k1))){
				logger.info("Value for key " + k1 + " does not match. " + m1.get(k1) + " --- " + m2.get(k1));
				return false;
			}
		}

		return true;
	}

	protected <K,V> boolean mapsListAreEquals(List<Map<K,V>> l1, List<Map<K,V>> l2) {

		if (l1.size() != l2.size()) {
			return false;
		}

		int success = 0;

		for(Map<K,V> m1 : l1) {
			for(Map<K,V> m2 : l2) {
				if(mapsAreEquals(m1, m2)){
					success++;
					break;
				}
			}
		}

		return success == l1.size();
	}

}
