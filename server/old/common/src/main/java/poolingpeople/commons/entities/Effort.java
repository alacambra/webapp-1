package poolingpeople.commons.entities;

public interface Effort {
	String getId();
	Long getDate();
	void setDate(Long date);
	String getComment();
	void setComment(String comment);
	Integer getTime();
	void setTime(Integer time);
	String getTaskId();
}
