package poolingpeople.webapplication.business.project.entity;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodesPropertiesNames;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationAlreadyExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationNotFoundException;
import poolingpeople.webapplication.business.task.entity.PersistedTask;
import poolingpeople.webapplication.business.task.entity.Task;

public class PersistedProject extends PersistedModel<Project> implements Project {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.PROJECT;
	private List<PersistedTask> relatedTasks;

	public PersistedProject(NeoManager manager, String id)
			throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedProject(NeoManager manager, Project project) throws NodeExistsException {
		super(manager, NODE_TYPE, project);
	}

	public PersistedProject(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	@Override
	public String getTitle() {
		return getStringProperty(NodesPropertiesNames.TITLE);
	}

	@Override
	public void setTitle(String title) {
		setProperty(NodesPropertiesNames.TITLE, title);
	}

	@Override
	public String getDescription() {
		return getStringProperty(NodesPropertiesNames.DESCRIPTION);
	}

	@Override
	public void setDescription(String description) {
		setProperty(NodesPropertiesNames.DESCRIPTION, description);
	}

	@Override
	public Long getStartDate() {
		return getLongProperty(NodesPropertiesNames.START_DATE);
	}

	@Override
	public void setStartDate(Long startDate) {
		setProperty(NodesPropertiesNames.START_DATE, startDate);
	}

	@Override
	public Long getEndDate() {
		return getLongProperty(NodesPropertiesNames.END_DATE);
	}

	@Override
	public void setEndDate(Long endDate) {
		setProperty(NodesPropertiesNames.END_DATE, endDate);
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedProject
				&& ((PersistedProject) obj).getNode().equals(underlyingNode);
	}

	@Override
	public int hashCode() {
		return underlyingNode.hashCode();
	}

	public void addSubtask(Project child) {
		Relations.IS_SUBPROJECT_OF.relationIsPossibleOrException(NODE_TYPE,
				((PersistedProject) child).getNodeType());
		manager.createRelationshipTo(underlyingNode,
				((PersistedProject) child).getNode(), Relations.IS_SUBPROJECT_OF);
	}

	@Override
	public Integer getStatusInteger() {
		return getStatus().getNumber();
	}

	@Override
	public void setStatusInteger(Integer status) {
		setStatus(ProjectStatus.getStatus(status));  
	}

	@Override
	public ProjectStatus getStatus() {
		try {
			return (getStringProperty(NodesPropertiesNames.STATUS).equals("")) ? ProjectStatus.NEW
					: ProjectStatus
					.valueOf(getStringProperty(NodesPropertiesNames.STATUS));
		} catch (NullPointerException e) {
			return ProjectStatus.NEW;
		}
	}

	@Override
	public void setStatus(ProjectStatus status) {
		setProperty(NodesPropertiesNames.STATUS, status.name());		
	}

	@Override
	public void addTask(Task task) {

		if (manager.relationExists(underlyingNode, ((PersistedModel<?>) task).getNode(), Relations.HAS)) {
			throw new RelationAlreadyExistsException();
		}

		createRelationshipTo((PersistedModel<?>) task, Relations.HAS);

		Long startDate = task.getStartDate();
		Long endDate = task.getEndDate();

		updateDates(startDate, endDate);

		setEffort(getEffort() + task.getEffort());
		calculateProgress();

	}

	private void calculateProgress() {
		List<PersistedTask> tasks = getRelatedNodes(Relations.HAS, PersistedTask.class);

		Float totalProgress = (float) 0;
		Integer totalEstimation = 0;

		for(Task t : tasks) {
			totalEstimation += t.getDuration();
			totalProgress += t.getDuration() * t.getProgress();
		}

		setProgress(totalProgress / totalEstimation); 
	}

	@Override
	public void removeTask(Task task) {
		if (!manager.relationExists(underlyingNode, ((PersistedModel<?>) task).getNode(), Relations.HAS)) {
			throw new RelationNotFoundException();
		}

	}

	@Override
	public Collection<Task> getTasks() {
		return getRelatedNodes(Relations.HAS, PersistedTask.class, Task.class);
	}

	private void startDateChanged(Long startDate) {

	}

	private void endDateChanged(Long endDate) {

	}

	@Override
	public Integer getEffort() {

		Integer effort = getIntegerProperty(NodesPropertiesNames.EFFORT);
		return effort == null ? 0 : effort;
	}

	private void setEffort(int effort) {
		setProperty(NodesPropertiesNames.EFFORT, effort);
	}

	@Override
	public void updateEffort() {
		
		int effort = 0;

		for (Task t : getRelatedTasks()) {
			effort += t.getEffort();
		}
		
		setEffort(effort);
	}

	@Override
	public void updateProgress() {
		calculateProgress();
	}

	@Override
	public void updateDates() {
		
		long startDate = getStartDate();
		long endDate = getEndDate();
		
		Iterator<PersistedTask> it = getRelatedTasks().iterator();
		
		for (Task t : getRelatedTasks()) {
			
			long sd = t.getStartDate();
			long ed = t.getEndDate();
			startDate = startDate > sd ? sd : startDate;
			endDate = endDate < ed ? ed : endDate;  
			
		};
		
		updateDates(startDate , endDate);
	}
	
	private void updateDates(long startDate, long endDate) {
		if (getStartDate() > startDate) {
			setStartDate(startDate);
			startDateChanged(startDate);
		}

		if (getEndDate() < endDate) {
			setEndDate(endDate);
			endDateChanged(endDate);
		}

	}

	@Override
	public void updateAll() {
		for (Task t : getRelatedTasks()) {



		}
	}

	@Override
	public Float getProgress() {
		return null;
	}

	private void setProgress(Float progress) {
		setProperty(NodesPropertiesNames.PROGRESS, progress);
	}

	private List<PersistedTask> getRelatedTasks(){

		if (relatedTasks == null){
			relatedTasks = getRelatedNodes(Relations.HAS, PersistedTask.class);
		}

		return relatedTasks;
	}

}





















































































