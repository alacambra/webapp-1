package poolingpeople.webapplication.business.task.boundary;

import poolingpeople.webapplication.business.entity.IgnoreAttribute;
import poolingpeople.webapplication.business.task.entity.Effort;

public class EffortDto implements Effort{
	
	private String id;
	private Long date;
	private String comment;
	private Integer time;
	
	@IgnoreAttribute
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Long getDate() {
		return date;
	}
	public void setDate(Long date) {
		this.date = date;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Integer getTime() {
		return time;
	}
	public void setTime(Integer time) {
		this.time = time;
	}
	
	
}
