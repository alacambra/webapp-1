package poolingpeople.webapplication.business.changelog.boundary;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.map.annotate.JsonView;
import org.neo4j.graphdb.Node;

import poolingpeople.commons.entities.ChangeLog;
import poolingpeople.commons.entities.ChangeLogAction;
import poolingpeople.commons.entities.ChangeLogAttributeUpdate;
import poolingpeople.commons.entities.Comment;
import poolingpeople.commons.entities.PoolingpeopleEntity;
import poolingpeople.commons.entities.Subject;
import poolingpeople.commons.entities.User;
import poolingpeople.webapplication.business.boundary.JsonViews;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ChangelogMixin implements ChangeLog{

	@Override
	@JsonView(JsonViews.Shared.class)
	public String getId() {
		return null;
	}
	

	@JsonIgnore
	public Node getNode() {
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
	public Long getDate() {
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
	public void setDate(Long date) {
		// TODO Auto-generated method stub
		
	}


	@Override
	public ChangeLog load(ChangeLogAttributeUpdate changeLogAttributeUpdate,
			Subject retrieveSubject, long currentTimeMillis) {
		// TODO Auto-generated method stub
		return null;
	}



}
