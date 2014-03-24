package poolingpeople.webapplication.business.changelog.boundary;

import java.util.List;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.entities.ChangeLogAttributeUpdate;
import poolingpeople.commons.entities.Comment;
import poolingpeople.commons.entities.PoolingpeopleEntity;
import poolingpeople.commons.entities.Subject;
import poolingpeople.commons.entities.User;

public class ChangelogDTO implements ChangeLog {

	private String comment;
	private Long date;


	@Override
	public Long getDate() {
		return date;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public void setDate(Long date) {
		this.date = date;
	}

	@Override
	public String getId() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Subject getSubject() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ChangeLogAction getAction() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setSubject(Subject subject) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void setAction(ChangeLogAction action) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public ChangeLog load(ChangeLogAttributeUpdate changeLogAttributeUpdate,
			Subject retrieveSubject, long currentTimeMillis) {
		// TODO Auto-generated method stub
		return null;
	}


}







































