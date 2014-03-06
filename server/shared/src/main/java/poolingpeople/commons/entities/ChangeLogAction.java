package poolingpeople.commons.entities;

public interface ChangeLogAction {
	String getId();

	String getChangedAttribute();

	String getChangeMessage();

	void setChangedAttribute(String attribute);

	void setChangeMessage(String message);
}
