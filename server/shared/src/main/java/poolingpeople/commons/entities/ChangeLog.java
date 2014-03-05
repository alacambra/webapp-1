package poolingpeople.commons.entities;

public interface ChangeLog{

	String getId();

	ChangeLogSubject getSubject();
	
	ChangeLogAction getAction();

	Long getDate();

}
