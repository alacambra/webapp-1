package poolingpeople.webapplication.business.neo4j;

import java.util.HashMap;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.ArrayUtils;
import org.neo4j.graphdb.RelationshipType;

public enum Relations implements RelationshipType {
	/**
	 * a subject can be a member of pool or project
	 */
	IS_MEMBER(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
		{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.POOL}
	})),
	
	/**
	 * A subject collaborates into a project
	 */
	COLLABORATES_IN(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
			{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.PROJECT}
		})),
		
	/**
	 * A subject can be responsible of a task
	 */
	DOES(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
			{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.TASK},
			{PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.TASK}
		})),
		
	/**
	 * A project can be a subproject from another subproject 
	 * ASK: which one to take?
	 */
	IS_SUBPROJECT_OF(PoolingpeopleObjectType.PROJECT, PoolingpeopleObjectType.PROJECT),
	PARENT_OF(PoolingpeopleObjectType.PROJECT, PoolingpeopleObjectType.PROJECT),
	
	/**
	 * A project can be a wrapper of another subtask (delegation)
	 */
	WRAPS(PoolingpeopleObjectType.PROJECT, PoolingpeopleObjectType.TASK),
	
	
	/**
	 * Project must do a task
	 */
	TODO(PoolingpeopleObjectType.PROJECT, PoolingpeopleObjectType.TASK),
	
	/**
	 * Subjects that has rolls in grouping and timing entities
	 */
	WITH_ROLLS(ArrayUtils.toMap(new Object[][]{
			{PoolingpeopleObjectType.ROLL, 
				Arrays.asList(PoolingpeopleObjectType.TASK, PoolingpeopleObjectType.PROJECT, PoolingpeopleObjectType.POOL)}
		})),
	
	/**
	 * A subject can be the owner of a pool or project
	 */
	OWNS(ArrayUtils.toMap(new Object[][]{
			{PoolingpeopleObjectType.USER, Arrays.asList(PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.PROJECT)},
			{PoolingpeopleObjectType.POOL, Arrays.asList(PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.PROJECT)}
		})),
	
	/**
	 * ASK: "HAS" is not clear enough. Should not be better IS_SUBPROJECT_OF/PARENT_OF and _TODO?
	 * TODO: ATTENTION!!!
	 */
	HAS(ArrayUtils.toMap(new Object[][]{
			{PoolingpeopleObjectType.PROJECT, Arrays.asList(PoolingpeopleObjectType.PROJECT, PoolingpeopleObjectType.TASK)}
		})),
		
	/**
	 * Message FROM subject to subject ABOUT object 
	 */
	FROM(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
			{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.TASK},
			{PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.TASK}
		})),
	TO(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
			{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.TASK},
			{PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.TASK}
		})),
	ABOUT(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
			{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.TASK},
			{PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.TASK}
		})),
	
	/**
	 * Services are offered by subjects to other subjects and are required by objects
	 */
	OFFERS(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
			{PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.SERVICE},
			{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.SERVICE}
		})),
	REQUIRES(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
			{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.SERVICE},
			{PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.SERVICE},
			{PoolingpeopleObjectType.PROJECT, PoolingpeopleObjectType.SERVICE},
			{PoolingpeopleObjectType.TASK, PoolingpeopleObjectType.SERVICE}
		})), 
	IS_CREATOR_OF(ArrayUtils.toMap(new PoolingpeopleObjectType[][]{
				{PoolingpeopleObjectType.USER, PoolingpeopleObjectType.TASK},
				{PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.TASK}
			})), 
	@Deprecated
	IS_SUBPOOL_OF(PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.POOL),
	IS_DIVISION_OF(PoolingpeopleObjectType.POOL, PoolingpeopleObjectType.POOL);
	
	private Map<Object, Object> validPairs;
	
	Relations(Map<Object, Object> validPairs) {
		this.validPairs = validPairs;
	}
	
	Relations(PoolingpeopleObjectType source, PoolingpeopleObjectType target) {
		this.validPairs = new HashMap<Object, Object>();
		validPairs.put(source, target);
	}
	
	public Map<Object, Object> getValidPairs() {
		return validPairs;
	}
	
	@SuppressWarnings("unchecked")
	public boolean relationIsPossible(PoolingpeopleObjectType source, PoolingpeopleObjectType target) {
		
		if ( validPairs == null || validPairs.size() == 0 ) return true;
		
		Object value =  validPairs.get(source);
		
		if ( value != null) {
			if ( List.class.isInstance(value) ) {
				return ((List<PoolingpeopleObjectType>)value).contains(target);
			} else {
				return value.equals(target);
			}
		}
		
		return false;
		
	}
	
	public void relationIsPossibleOrException(PoolingpeopleObjectType source, PoolingpeopleObjectType target){
		if (!relationIsPossible(source, target)) {
			throw new RuntimeException("Relation " + name() + " between " + source + " and " + target + "not possible");
		}
	}
	 
}