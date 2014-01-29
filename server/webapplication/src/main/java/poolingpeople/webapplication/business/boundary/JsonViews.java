package poolingpeople.webapplication.business.boundary;

public class JsonViews {
	
	/************************************** GENERAL VIEWS ***********************************************/
	
	/**
	 * Attributes that must NEVER be sent
	 */
	public static interface NeverUsed{}
	
	/**
	 * Attributes that can be send in a subentity
	 */
	public static interface Shared{}
	
	/**
	 * Attributes for an elementary (visitor or non contact...) view but only in the main entity
	 */
	public static interface Basic extends Shared{}
	
	/************************************** PROJECT's VIEWS ***********************************************/
	
	/**
	 * Basic attributes from the main entity and shared attributes of subentity 
	 */
	public static interface BasicProjectWithElements extends Basic{}
	
	/**
	 * All attributes of an entity without subentities
	 */
	public static interface FullProject extends Basic{}
	
	/**
	 * All attributes of an entity with subentities
	 */
	public static interface FullProjectWithElements extends BasicProjectWithElements, FullProject{}
	
	/************************************** TASK's VIEWS ***********************************************/
	/**
	 * Basic attributes from the main entity and shared attributes of subentity 
	 */
	public static interface BasicTaskWithElements extends Basic{}
	
	/**
	 * All attributes of an entity without subentities
	 */
	public static interface FullTask extends Basic{}
	
	/**
	 * All attributes of an entity with subentities
	 */
	public static interface FullTaskWithElements extends BasicTaskWithElements, FullTask{}
	
	
	/************************************** EFFORT's VIEWS ***********************************************/
	/**
	 * Basic attributes from the main entity and shared attributes of subentity 
	 */
	public static interface BasicEffortWithElements extends Basic{}
	
	/**
	 * All attributes of an entity without subentities
	 */
	public static interface FullEffort extends Basic{}
	
	/**
	 * All attributes of an entity with subentities
	 */
	public static interface FullEffortWithElements extends BasicEffortWithElements, FullEffort{}
}
