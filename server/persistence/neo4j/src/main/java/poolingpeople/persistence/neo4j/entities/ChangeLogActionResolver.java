package poolingpeople.persistence.neo4j.entities;

import java.util.Hashtable;
import java.util.Map;

import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.exceptions.RootApplicationException;

public class ChangeLogActionResolver {

	/**
	 * There is no need for a serialversion uid
	 */
	@SuppressWarnings("serial")
	private static Map<String, Class<? extends ChangeLogAction>> changeLogActionMap = 
			new Hashtable<String, Class<? extends ChangeLogAction>>() {
		{
			put ("PersistedChangeLogAttributeUpdateAction", PersistedChangeLogAttributeUpdateAction.class);
		}
	};
	
	public Class<? extends ChangeLogAction> resolveChangeLogActionByName(String changeLogActionType) {
		if(!changeLogActionMap.containsKey(changeLogActionType)) 
			throw new RootApplicationException(String.format("The given ChangeLogAction class does not exist %s", changeLogActionType));
		return changeLogActionMap.get(changeLogActionType);
	}

}
