package poolingpeople.commons.entities;

import java.util.Collection;
import java.util.List;

import poolingpeople.webapplication.business.neo4j.Inheritance.BottomObject;
import poolingpeople.webapplication.business.neo4j.Inheritance.Inheritable;
import poolingpeople.webapplication.business.neo4j.Inheritance.PropagationType;
import poolingpeople.webapplication.business.neo4j.Inheritance.Slave;
import poolingpeople.webapplication.business.neo4j.Inheritance.TopObject;

public class ManagedTask implements Task {

	@Override
	public String getId() {
		//proxy: this.id = neoManager.getProperty(id)
		//return this.id
		return null;
	}

	@Override
	public String getTitle() {
		
		return null;
	}

	@Override
	public void setTitle(String title) {
		//this.title=title
		//proxy: neoManager.setProperty("title", this.title)
	}

	@Override
	public String getDescription() {
		
		return null;
	}

	@Override
	public void setDescription(String description) {
		

	}

	@Override
	public TaskPriority getPriority() {
		
		return null;
	}

	@Override
	public void setPriority(TaskPriority priority) {
		

	}

	@Override
	public TaskStatus getStatus() {
		
		return null;
	}

	@Override
	public void setStatus(TaskStatus status) {
		

	}

	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	@Override
	public Long getStartDate() {
		
		return null;
	}

	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	@Override
	public Long getEndDate() {
		
		return null;
	}

	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	@Override
	public Float getProgress() {
		
		return null;
	}

	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	@Override
	public Integer getDuration() {
		
		return null;
	}

	@Override
	public void setDefaultDuration(Integer progress) {
		

	}

	@Override
	public void addEffort(Effort effort) {
		

	}

	@Slave
	@Override
	public Collection<Effort> getEfforts() {
		//proxy this.efforts = excute.query
		//return this.efforts
		return null;
	}

	@Override
	public void deleteEffort(Effort effort) {
		

	}

	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	@Override
	public Integer getEffort() {
		
		return null;
	}

	@TopObject
	@Override
	public Project getProject() {
		
		return null;
	}

	@Override
	public void setDefaultStartDate(Long startDate) {
		

	}

	@Override
	public void setDefaultEndDate(Long endDate) {
		

	}

	@Override
	public void setDefaultProgress(Float progress) {
		

	}

	@Override
	public void updateProgress() {
		

	}

	@Override
	public void updateDates() {
		

	}

	@Override
	public void updateAll() {
		

	}

	@Override
	public void updateDuration() {
		

	}

	@Override
	public void updateEfforts() {
		

	}

	@Override
	public void addSubtask(Task child) {
		

	}

	@Override
	public void removeSubtask(Task child) {
		

	}

	@Override
	public void removeTaskRelation(Task child) {
		

	}

	@Override
	public void setAssignee(User u) {
		

	}

	@TopObject
	@Override
	public Task getParent() {
		
		return null;
	}

	@Override
	public String getParentId() {
		
		return null;
	}

	@Override
	public User getAssignee() {
		
		return null;
	}

	@BottomObject
	@Override
	public List<Task> getSubtasks() {
		
		return null;
	}

	@Override
	public Integer getSubtaskCount() {
		
		return null;
	}

}
