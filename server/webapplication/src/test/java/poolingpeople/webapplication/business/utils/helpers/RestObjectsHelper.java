package poolingpeople.webapplication.business.utils.helpers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.codehaus.jackson.map.ObjectMapper;

import poolingpeople.webapplication.business.task.boundary.TaskBoundary;

@Stateless
public class RestObjectsHelper {

	Logger logger = Logger.getLogger(this.getClass());

	@Inject
	TaskBoundary taskBoundary;
	ObjectMapper mapper = new ObjectMapper();

	public <K,V> Map<K,V> insertTaskFromFile(String filename) {

		String json = FileLoader.getText(filename);
		return insertTaskFromFile(json);

	}

	public <K,V> Map<K,V> insertTaskFromJson(String json) {

		try {

			Response r = taskBoundary.saveTask(json);
			Map<K,V> ret = convertJsonToMap((String)r.getEntity());
			return ret;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}

	}

	public <K,V> Map<K,V> convertJsonToMap(String json) {
		try {

			Map<K,V> data = mapper.readValue(json, Map.class);
			return data;

		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	public <K,V> Map<K,V> convertJsonFileToMap(String filename) {
		String json = FileLoader.getText(filename);
		return convertJsonToMap(json);
	}

	public <K,V> Map<String, Map<K,V>> createTaskListFromTaskFile(String filename, int num) {

		Map<String, Map<K,V>> createdTasks = new HashMap<String, Map<K,V>>();

		for (int i = 0; i<num; i++ ) {
			Map<K,V> created = insertTaskFromFile(filename);
			createdTasks.put((String) created.get("id"), created);			
		}

		return createdTasks;
	}

	public <K,V> Map<String, Map<K,V>> convertTaskListFromTaskFile(String json) {

		Map<String, Map<K,V>> tasks = new HashMap<String, Map<K,V>>();
//		Map<K,V> tmps = mapper.readValue(json, Map.class);
		
//		for(K key : tmps.keySet()){
//			tasks.put("id", value)
//		}
//
//		for (int i = 0; i<num; i++ ) {
//			Map<K,V> created = insertTaskFromFile(filename);
//			createdTasks.put((String) created.get("id"), created);			
//		}
//
//		return createdTasks;
		
		return null;
	}


	public boolean mapsAreEquals(Map<?,?> m1, Map<?,?> m2) {

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


}











































































