package poolingpeople.commons.entities;

public interface ChangeLog {

	String getId();

	Subject getSubject();

	ChangeLogAction getAction();

	Long getDate();

	void setId(String id);

	void setSubject(Subject subject);

	void setAction(ChangeLogAction action);

	void setDate(Long date);
}
