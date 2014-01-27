package poolingpeople.webapplication.business.task.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.neo4j.graphdb.Node;

import poolingpeople.webapplication.business.entity.PersistedModel;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.NodePropertyName;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationNotFoundException;
import poolingpeople.webapplication.business.project.entity.PersistedProject;
import poolingpeople.webapplication.business.project.entity.Project;

public class PersistedTask extends PersistedModel<Task> implements Task {

	public static final PoolingpeopleObjectType NODE_TYPE = PoolingpeopleObjectType.TASK;
	private List<PersistedTask> subtasks;

	public PersistedTask(NeoManager manager, String id)
			throws NotUniqueException, NodeNotFoundException {
		super(manager, id, NODE_TYPE);
	}

	public PersistedTask(NeoManager manager, Task task) throws NodeExistsException {
		super(manager, NODE_TYPE, task);
	}

	public PersistedTask(NeoManager manager, Node node) {
		super(manager, node, NODE_TYPE);
	}

	/**************** NON-INHERITABLE ATTRIBUTES *****************/
	@Override
	public String getTitle() {
		return manager.getStringProperty(underlyingNode,
				NodePropertyName.TITLE.name());
	}

	@Override
	public void setTitle(String title) {
		manager.setProperty(underlyingNode, NodePropertyName.TITLE.name(),
				title);
	}

	@Override
	public String getDescription() {
		return manager.getStringProperty(underlyingNode,
				NodePropertyName.DESCRIPTION.name());
	}

	@Override
	public void setDescription(String description) {
		manager.setProperty(underlyingNode,
				NodePropertyName.DESCRIPTION.name(), description);
	}

	@Override
	public TaskPriority getPriority() {
		try {
			return (manager.getStringProperty(underlyingNode,
					NodePropertyName.PRIORITY.name()).equals("")) ? TaskPriority.NORMAL
							: TaskPriority.valueOf(manager.getStringProperty(
									underlyingNode,
									NodePropertyName.PRIORITY.name()));
		} catch (NullPointerException e) {
			return TaskPriority.LOW;
		}
	}

	@Override
	public void setPriority(TaskPriority priority) {
		manager.setProperty(underlyingNode,
				NodePropertyName.PRIORITY.name(), priority.name());
	}

	@Override
	public TaskStatus getStatus() {
		try {
			return (manager.getStringProperty(underlyingNode,
					NodePropertyName.STATUS.name()).equals("")) ? TaskStatus.NEW
							: TaskStatus
							.valueOf(manager.getStringProperty(underlyingNode,
									NodePropertyName.STATUS.name()));
		} catch (NullPointerException e) {
			return TaskStatus.NEW;
		}
	}

	@Override
	public void setStatus(TaskStatus status) {
		manager.setProperty(underlyingNode, NodePropertyName.STATUS.name(),
				status.name());
	}

	@Override
	public Integer getPriorityInteger() {
		return getPriority().getNumber();
	}

	@Override
	public void setPriorityInteger(Integer priority) {
		setPriority(TaskPriority.getPriority(priority));
	}

	@Override
	public Integer getStatusInteger() {
		return getStatus().getNumber();
	}

	@Override
	public void setStatusInteger(Integer status) {
		setStatus(TaskStatus.getStatus(status));  
	}

	/**************** INHERITABLE ATTRIBUTES *****************/

	@Override
	public Integer getDuration() {
		return manager.getIntegerProperty(underlyingNode,
				NodePropertyName.DURATION.name());
	}

	@Override
	public void setDuration(Integer duration) {
		manager.setProperty(underlyingNode,
				NodePropertyName.DURATION.name(), new Integer(duration));
	}

	private void setEffort(Integer totalEffort) {
		manager.setProperty(underlyingNode, NodePropertyName.EFFORT.name(), totalEffort);
	}

	@Override
	public Integer getEffort() {
		Integer totalEffort = manager.getIntegerProperty(underlyingNode, NodePropertyName.EFFORT.name());

		if ( totalEffort == null) 
			totalEffort = 0;

		return totalEffort;
	}

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

	@Override
	public void setDefaultProgress(Float progress) {
		setProperty(NodePropertyName.DEFAULT_PROGRESS, progress);
	}


	/**************** FLAGS FOR INHERITABLE ATTRIBUTES *****************/

	public boolean getProgressIsDefault() {
		return getSubtasks().size() == 0;
	}

	public boolean getEndDateIsDefault() {
		return getSubtasks().size() == 0;
	}

	public boolean getStatusIsDefault() {
		return getSubtasks().size() == 0;
	}

	public boolean getStartDateIsDefault() {
		return getSubtasks().size() == 0;
	}

	public boolean getDurationIsDefult(){
		return getSubtasks().size() == 0;
	}

	/**************** RELATIONAL METHODS *****************/

	public void addSubproject(PersistedModel<?> child) {
		createRelationTo(Relations.IS_SUBPROJECT_OF, child, true);
	}

	@Override
	public void addEffort(Effort effort) {

		Integer totalEffort = getEffort() + effort.getTime();
		setEffort(totalEffort);
		createRelationTo(Relations.HAS_EFFORT, (PersistedModel) effort, true);

	}

	@Override
	public Collection<Effort> getEfforts() {

		Collection<Node> nodes = manager.getRelatedNodes(underlyingNode, Relations.HAS_EFFORT);
		return manager.getPersistedObjects(nodes, new ArrayList<Effort>(), PersistedEffort.class, Effort.class);

	}

	@Override
	public void deleteEffort(Effort effort) {

		if (!manager.relationExists(underlyingNode, ((PersistedModel) effort).getNode(), Relations.HAS_EFFORT)) {
			throw new RelationNotFoundException();
		}

		Integer totalEffort = getEffort() - effort.getTime();
		setEffort(totalEffort);

		manager.removeNode(((PersistedModel) effort).getNode());
	}

	public Project getProject() {

		Node n = manager.getRelatedNode(underlyingNode, Relations.PROJECT_HAS_TASK);

		if ( n != null ) {
			return new PersistedProject(manager, n);
		}

		return null;
	}

	/**************** UPDATE METHODS *****************/

	private void calculateProgress() {
		Float totalProgress = (float) 0;
		Integer totalEstimation = 0;

		for(Task t : getSubtasks()) {
			totalEstimation += t.getDuration();
			totalProgress += t.getDuration() * t.getProgress();
		}

		setProgress(totalEstimation > 0 ? totalProgress / totalEstimation : -1);
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

		for (Task t : getSubtasks()) {

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

	@Override
	public void updateAll() {
		updateEfforts();
		updateDates();
		updateProgress();
	}


	public void updateEfforts() {
		Collection<Effort> efforts = getEfforts();
		int totalEffort = 0;

		for (Effort effort : efforts) {
			totalEffort +=effort.getTime();
		}

		setEffort(totalEffort);
	}

	@Override
	public void runDeletePreconditions() {

		for(Effort effort : getEfforts()) {
			deleteEffort(effort);
		}

		Project p = getProject();
		if( p != null ){
			p.removeTask(this);
		}
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
	private List<PersistedTask> getSubtasks(){

		subtasks = getRelatedNodes(Relations.HAS_SUBTASK, PersistedTask.class);
		return subtasks;
	}


	@Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedTask
				&& ((PersistedTask) obj).getNode().equals(underlyingNode);
	}

}
























































