package poolingpeople.webapplication.business.task.boundary;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.task.entity.Task;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EffortMixin implements Effort{

	@Override
	public String getId() {
		return null;
	}

	@Override
	public Long getDate() {
		return null;
	}

	@Override
	public void setDate(Long date) {
		
	}

	@Override
	public String getComment() {
		return null;
	}

	@Override
	public void setComment(String comment) {
		
	}

	@Override
	public Integer getTime() {
		return null;
	}

	@Override
	public void setTime(Integer time) {
		
	}
	
	@JsonIgnore
	public Node getNode() {
		return null;
	}
	
	@JsonIgnore
	public PoolingpeopleObjectType getNodeType() {
		return null;
	}

	@Override
	public String getTaskId() {
		return null;
	}

}





































