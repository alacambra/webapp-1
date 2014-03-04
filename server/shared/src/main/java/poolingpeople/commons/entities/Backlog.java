package poolingpeople.commons.entities;

public interface Backlog{

	String getId();

	BacklogSubject getSubject();
	
	BacklogAction getAction();

	Long getDate();

}
