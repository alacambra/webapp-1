package poolingpeople.commons.entities;

public interface Comment {
	
	public String getComment();
	public Long getDate();

	public void setComment(String text);
	public void setDate(Long date);
	
	public User getOwner();
	public PoolingpeopleEntity getCommentedEntity();
}
