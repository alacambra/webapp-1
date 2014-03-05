package poolingpeople.commons.entities;

public interface ChangeLogAction {
	String getId();

	String getChangedAttribute();

	String getChangeMessage();

	void setId(String id);

	void setChangedAttribute(String attribute);

	void setChangeMessage(String message);
}
