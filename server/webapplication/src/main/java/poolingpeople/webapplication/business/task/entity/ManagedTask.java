




package poolingpeople.webapplication.business.task.entity;

import java.util.Collection;
import java.util.List;

import poolingpeople.webapplication.business.neo4j.Inheritance.BottomObject;
import poolingpeople.webapplication.business.neo4j.Inheritance.Inheritable;
import poolingpeople.webapplication.business.neo4j.Inheritance.PropagationType;
import poolingpeople.webapplication.business.neo4j.Inheritance.Slave;
import poolingpeople.webapplication.business.neo4j.Inheritance.TopObject;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.user.entity.User;

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
	public Integer getPriorityInteger() {
		
		return null;
	}

	@Override
	public void setPriorityInteger(Integer priority) {
		

	}

	@Override
	public void setPriority(TaskPriority priority) {
		

	}

	@Override
	public TaskStatus getStatus() {
		
		return null;
	}

	@Override
	public Integer getStatusInteger() {
		
		return null;
	}

	@Override
	public void setStatusInteger(Integer status) {
		

	}

	@Override
	public void setStatus(TaskStatus status) {
		

	}

	@Override
	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	public Long getStartDate() {
		
		return null;
	}

	@Override
	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	public Long getEndDate() {
		
		return null;
	}

	@Override
	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	public Float getProgress() {
		
		return null;
	}

	@Override
	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	public Integer getDuration() {
		
		return null;
	}

	@Override
	public void setDefaultDuration(Integer progress) {
		

	}

	@Override
	public void addEffort(Effort effort) {
		

	}

	@Override
	@Slave
	public Collection<Effort> getEfforts() {
		//proxy this.efforts = excute.query
		//return this.efforts
		return null;
	}

	@Override
	public void deleteEffort(Effort effort) {
		

	}

	@Override
	@Inheritable(propagationType=PropagationType.BOTTOM_TOP)
	public Integer getEffort() {
		
		return null;
	}

	@Override
	@TopObject
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

	@Override
	@TopObject
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

	@Override
	@BottomObject
	public List<Task> getSubtasks() {
		
		return null;
	}

	@Override
	public Integer getSubtaskCount() {
		
		return null;
	}

}
