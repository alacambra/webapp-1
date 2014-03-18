package poolingpeople.persistence.neo4j.entities;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.AbstractCollection;
import java.util.Collection;
import java.util.HashMap;

import javax.enterprise.inject.Instance;
import javax.inject.Inject;

import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.PoolingpeopleEntity;
import poolingpeople.commons.exceptions.RootApplicationException;
import poolingpeople.persistence.neo4j.NeoManager;
import poolingpeople.persistence.neo4j.NodePropertyName;
import poolingpeople.persistence.neo4j.PoolingpeopleObjectType;
import poolingpeople.persistence.neo4j.exceptions.ConsistenceException;

public class PersistedClassResolver {

	@Inject
	private NeoManager manager;
	private HashMap<PoolingpeopleObjectType, Class<? extends AbstractPersistedModel<?>>> objectTypesMap;
	
	
	
	
	@Inject
	public PersistedClassResolver(){
		objectTypesMap = new HashMap<>();
		objectTypesMap.put(PersistedUser.NODE_TYPE, PersistedUser.class);
		objectTypesMap.put(PersistedTask.NODE_TYPE, PersistedTask.class);
		objectTypesMap.put(PersistedEffort.NODE_TYPE, PersistedEffort.class);
		objectTypesMap.put(PersistedComment.NODE_TYPE, PersistedComment.class);
		objectTypesMap.put(PersistedChangeLogAction.NODE_TYPE, PersistedChangeLogAction.class);
	}
	
	public Class<? extends AbstractPersistedModel<?>> getPersistedEntityClassForNode(Node n){
		
		String type = manager.getStringProperty(n,NodePropertyName.TYPE.name());
		
		if ( type == null || "".equals(type)) {
			throw new ConsistenceException("Given node (" + n.getId() + ") is not a persisted model. No type found.");
		}
		
		PoolingpeopleObjectType objectType = PoolingpeopleObjectType.valueOf(type);
		if (objectType == null) {
			throw new ConsistenceException("Given node (" + n.getId() + ") is not a persisted model. No valid type found (" + type + ").");
		}
		
		return objectTypesMap.get(objectType);
		
	}
	
	public PoolingpeopleEntity getPoolingpeopleEntityFromNode(Node n){
		
		Class<?> clazz = getPersistedEntityClassForNode(n);
		
		if (clazz.isAssignableFrom(PoolingpeopleEntity.class)) {
			try {
				
				Constructor<?> c = clazz.getConstructor(NeoManager.class, Node.class);
				return (PoolingpeopleEntity)c.newInstance(this, n);
				
			} catch (NoSuchMethodException | SecurityException | InstantiationException | IllegalAccessException
					| IllegalArgumentException | InvocationTargetException e) {
				RootApplicationException applicationException = new RootApplicationException();
				applicationException.setStackTrace(e.getStackTrace());
				throw applicationException;
			}
		}
		
		throw new RootApplicationException("Class " + clazz.getName() + " is not a PoolingpeopleEntity");
	}
	
	
}































