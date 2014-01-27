package poolingpeople.webapplication.business.project.entity;

import java.util.Collection;
import java.util.List;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodePropertyName;
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

	/**************** NON-INHERITABLE ATTRIBUTES *****************/
	
	@Override
	public String getTitle() {
		return getStringProperty(NodePropertyName.TITLE);
	}

	@Override
	public void setTitle(String title) {
		setProperty(NodePropertyName.TITLE, title);
	}

	@Override
	public String getDescription() {
		return getStringProperty(NodePropertyName.DESCRIPTION);
	}

	@Override
	public void setDescription(String description) {
		setProperty(NodePropertyName.DESCRIPTION, description);
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
			return (getStringProperty(NodePropertyName.STATUS).equals("")) ? ProjectStatus.NEW
					: ProjectStatus
					.valueOf(getStringProperty(NodePropertyName.STATUS));
		} catch (NullPointerException e) {
			return ProjectStatus.NEW;
		}
	}
	
	@Override
	public void setStatus(ProjectStatus status) {
		setProperty(NodePropertyName.STATUS, status.name());		
	}

	/**************** INHERITABLE ATTRIBUTES *****************/
	
	@Override
	public Long getStartDate() {

		Long startDate = getLongProperty(NodePropertyName.START_DATE);
		return getStartDateIsDefault() ? getDefaultStartDate() : startDate;
		
	}

	@Override
	public Long getEndDate() {

		Long endDate = getLongProperty(NodePropertyName.END_DATE);
		return getEndDateIsDefault() ? getDefaultEndDate() : endDate;
		
	}
	
	private void setStartDate(Long startDate) {
		setProperty(NodePropertyName.START_DATE, startDate);
	}

	private void setEndDate(Long startDate) {
		setProperty(NodePropertyName.END_DATE, startDate);
	}


	@Override
	public void setDefaultStartDate(Long startDate) {
		
		if(getLongProperty(NodePropertyName.START_DATE) == null) {
			setStartDate(startDate);
		}
		
		setProperty(NodePropertyName.DEFAULT_START_DATE, startDate);
	}

	@Override
	public void setDefaultEndDate(Long endDate) {
		
		if(getLongProperty(NodePropertyName.END_DATE) == null) {
			setEndDate(endDate);
		}
		
		setProperty(NodePropertyName.DEFAULT_END_DATE, endDate);
	}

	private Long getDefaultStartDate() {
		return getLongProperty(NodePropertyName.DEFAULT_START_DATE);
	}
	
	private Long getDefaultEndDate() {
		return getLongProperty(NodePropertyName.DEFAULT_END_DATE);
	}

	@Override
	public Float getProgress() {
  		Float progress = getFloatProperty(NodePropertyName.PROGRESS);
		return getProgressIsDefault() ? getDefaultProgress() : progress;
	}
	
	private Float getDefaultProgress(){
		return getFloatProperty(NodePropertyName.DEFAULT_PROGRESS);
	}

	private void setProgress(Float progress) {
		setProperty(NodePropertyName.PROGRESS, progress);
	}
	
	public void setDefaultProgress(Float progress) {
		setProperty(NodePropertyName.DEFAULT_PROGRESS, progress);
	}

	/**************** FLAGS FOR INHERITABLE ATTRIBUTES *****************/
	
	/**
	 * @todo: which are the default values? How to know if values child are valid?
	 * Each attribute must have defaults....
	 * @return
	 */
	public boolean getProgressIsDefault() {
		return getRelatedTasks().size() == 0;
	}
	
	public boolean getEndDateIsDefault() {
		return getRelatedTasks().size() == 0;
	}
	
	public boolean getStatusIsDefault() {
		return getRelatedTasks().size() == 0;
	}
	
	public boolean getStartDateIsDefault() {
		return getRelatedTasks().size() == 0;
	}

	/**************** RELATIONAL METHODS *****************/
	
	public void addSubproject(Project child) {
		Relations.IS_SUBPROJECT_OF.relationIsPossibleOrException(NODE_TYPE,
				((PersistedProject) child).getNodeType());
		manager.createRelationshipTo(underlyingNode,
				((PersistedProject) child).getNode(), Relations.IS_SUBPROJECT_OF);
	}
	
	@Override
	public void addTask(Task task) {

		if (manager.relationExists(underlyingNode, ((PersistedModel<?>) task).getNode(), Relations.PROJECT_HAS_TASK)) {
			throw new RelationAlreadyExistsException();
		}

		createRelationshipTo((PersistedModel<?>) task, Relations.PROJECT_HAS_TASK);

//		Long startDate = task.getStartDate();
//		Long endDate = task.getEndDate();
//
//		updateDates(startDate, endDate);
//		updateDates();
//		setEffort(getEffort() + task.getEffort());
//		calculateProgress();
		
		updateAll();

	}

	@Override
	public void removeTask(Task task) {
		if (!manager.relationExists(underlyingNode, ((PersistedModel<?>) task).getNode(), Relations.PROJECT_HAS_TASK)) {
			throw new RelationNotFoundException();
		}

		manager.removeNode(((PersistedModel<?>) task).getNode());
//		getRelatedTasks().remove(task);
		updateAll();
	}

	@Override
	public Collection<Task> getTasks() {
		return getRelatedNodes(Relations.PROJECT_HAS_TASK, PersistedTask.class, Task.class);
	}
	
	@Override
	public Integer getEffort() {

		Integer effort = getIntegerProperty(NodePropertyName.EFFORT);
		return effort == null ? 0 : effort;
	}

	private void setEffort(int effort) {
		setProperty(NodePropertyName.EFFORT, effort);
	}

	/**************** UPDATE METHODS *****************/
	
	private void calculateProgress() {
		Float totalProgress = (float) 0;
		Integer totalEstimation = 0;

		for(Task t : getTasks()) {
			totalEstimation += t.getDuration();
			totalProgress += t.getDuration() * t.getProgress();
		}

		setProgress(totalEstimation > 0 ? totalProgress / totalEstimation : -1);
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

		Long startDate = getDefaultStartDate();
		Long endDate = getDefaultEndDate();
		Long currentStartDate = getStartDate();
		Long currentEndDate = getEndDate();

		for (Task t : getRelatedTasks()) {

			Long sd = t.getStartDate();
			Long ed = t.getEndDate();
			startDate = startDate > sd ? sd : startDate;
			endDate = endDate < ed ? ed : endDate;

		};
		
		if ( currentStartDate != startDate ) {
			setStartDate(startDate);
			startDateChanged(startDate);
		}
		
		if ( currentEndDate != endDate ) {
			setEndDate(endDate);
			endDateChanged(endDate);
		}

	}

//	private void updateDates(long startDate, long endDate) {
//		if (getStartDate() > startDate) {
//			setStartDate(startDate);
//			startDateChanged(startDate);
//		}
//
//		if (getEndDate() < endDate) {
//			setEndDate(endDate);
//			endDateChanged(endDate);
//		}
//
//	}

	@Override
	public void updateAll() {
		updateEffort();
		updateDates();
		updateProgress();
	}

	/**************** PROPAGATION METHODS *****************/
	
	private void startDateChanged(Long startDate) {
		
	}

	private void endDateChanged(Long endDate) {
		
	}
	
	private void durationChanged(Integer duration) {
		
	}
	
	private void progressChanged(Float progress){
		
	}
	
	private void effortChanged(Integer effort) {
		
	}


	/**************** HELPER METHODS *****************/
	
	private List<PersistedTask> getRelatedTasks(){

//		if (relatedTasks == null){
			relatedTasks = getRelatedNodes(Relations.PROJECT_HAS_TASK, PersistedTask.class);
//		}

		return relatedTasks;
	}

	
	@Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedProject
				&& ((PersistedProject) obj).getNode().equals(underlyingNode);
	}

	@Override
	public Integer getTaskCount() {
		return getTasks().size();
	}

}





































































