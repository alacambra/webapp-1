package poolingpeople.commons.entities;

public interface Effort extends IsSynchronizable<Effort>{
	String getId();
	Long getDate();
	void setDate(Long date);
	String getComment();
	void setComment(String comment);
	Integer getTime();
	void setTime(Integer time);
	String getTaskId();
}
