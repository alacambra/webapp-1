package poolingpeople.webapplication.business.utils.helpers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
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
		return insertTaskFromJson(json);

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

	public <K,V> List<Map<K,V>> createTaskListFromTaskFile(String filename, int num) {

		List<Map<K,V>> tasks = new ArrayList<Map<K,V>>();

		for (int i = 0; i<num; i++ ) {
			Map<K,V> created = insertTaskFromFile(filename);
			tasks.add(created);
		}

		return tasks;
	}
	
	public <K,V> String convertMapToJson(Map<K,V> map) {
		
		try {
			return mapper.writeValueAsString(map);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		
	}


	public <K,V> boolean mapsAreEquals(Map<K,V> m1, Map<K,V> m2) {

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

	public <K,V> boolean mapsListAreEquals(List<Map<K,V>> l1, List<Map<K,V>> l2) {

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











































































