package poolingpeople.commons.entities;

public interface ChangeLogAttributeUpdate extends ChangeLogAction {
	String getChangedAttributeName();

	String getOldValue();

	String getNewValue();


}
