package poolingpeople.commons.entities;

public interface ChangeLog {

	String getId();

	ChangeLogSubject getSubject();

	ChangeLogAction getAction();

	Long getDate();

	void setId(String id);

	void setSubject(ChangeLogSubject subject);

	void setAction(ChangeLogAction action);

	void setDate(Long date);
}
