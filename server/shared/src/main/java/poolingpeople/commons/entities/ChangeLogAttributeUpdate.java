package poolingpeople.commons.entities;

public interface ChangeLogAttributeUpdate extends ChangeLogAction {
	String getCode();

	String getChangedAttributeName();

	String getOldValue();

	String getNewValue();

	void setChangedAttribute(String attribute);

	void setChangeMessage(String message);
}
