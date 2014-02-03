package poolingpeople.webapplication.business.task.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.neo4j.graphdb.Direction;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.RelationshipType;

import poolingpeople.webapplication.business.boundary.RootApplicationException;
import poolingpeople.webapplication.business.entity.AbstractPersistedModel;
import poolingpeople.webapplication.business.neo4j.DefaultValues;
import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.NodePropertyName;
import poolingpeople.webapplication.business.neo4j.PoolingpeopleObjectType;
import poolingpeople.webapplication.business.neo4j.Relations;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.NodeNotFoundException;
import poolingpeople.webapplication.business.neo4j.exceptions.NotUniqueException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationAlreadyExistsException;
import poolingpeople.webapplication.business.neo4j.exceptions.RelationNotFoundException;
import poolingpeople.webapplication.business.project.entity.PersistedProject;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.user.entity.PersistedUser;
import poolingpeople.webapplication.business.user.entity.User;

public class PersistedTask extends AbstractPersistedModel<Task> implements Task {

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
		setProperty(NodePropertyName.TITLE,
				title);
	}

	@Override
	public String getDescription() {
		return manager.getStringProperty(underlyingNode,
				NodePropertyName.DESCRIPTION.name());
	}

	@Override
	public void setDescription(String description) {
		setProperty(NodePropertyName.DESCRIPTION, description);
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
		setProperty(NodePropertyName.PRIORITY, priority.name());
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
		setProperty(NodePropertyName.STATUS,
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

		Integer duration = getCalculatedDuration();
		return getDurationIsDefault() ? getDefaultDuration() : duration;
	}

	private Integer getCalculatedDuration() {
		return getIntegerProperty(NodePropertyName.DURATION);
	}

	private void setDuration(Integer duration) {
		setProperty(NodePropertyName.DURATION, new Integer(duration));
	}

	@Override
	public void setDefaultDuration(Integer progress) {
		setProperty(NodePropertyName.DEFAULT_DURATION, progress);
	}

	private void setEffort(Integer totalEffort) {

		if ( getEffort() != totalEffort) {
			setProperty(NodePropertyName.EFFORT, totalEffort);
			effortChanged(totalEffort);
		}
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

		Long startDate = getCalculatedStartDate();
		return getStartDateIsDefault() ? getDefaultStartDate() : startDate;

	}

	private Long getCalculatedStartDate() {
		return getLongProperty(NodePropertyName.START_DATE);
	}

	private void setStartDate(Long startDate) {
		setProperty(NodePropertyName.START_DATE, startDate);
	}

	@Override
	public Long getEndDate() {

		Long endDate = getCalculatedEndDate();
		return getEndDateIsDefault() ? getDefaultEndDate() : endDate;

	}

	private Long getCalculatedEndDate() {
		return getLongProperty(NodePropertyName.END_DATE);
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
		updateAll();
	}

	@Override
	public void setDefaultEndDate(Long endDate) {

		if(getLongProperty(NodePropertyName.END_DATE) == null) {
			setEndDate(endDate);
		}

		setProperty(NodePropertyName.DEFAULT_END_DATE, endDate);
		updateAll();
	}

	private Long getDefaultStartDate() {
		return getLongProperty(NodePropertyName.DEFAULT_START_DATE);
	}

	private Long getDefaultEndDate() {
		return getLongProperty(NodePropertyName.DEFAULT_END_DATE);
	}

	private Integer getDefaultDuration() {
		return getIntegerProperty(NodePropertyName.DEFAULT_DURATION);
	}

	@Override
	public Float getProgress() {
		Float progress = getCalculatedProgress();
		return getProgressIsDefault() ? getDefaultProgress() : progress;
	}

	private Float getDefaultProgress(){
		return getFloatProperty(NodePropertyName.DEFAULT_PROGRESS);
	}

	private void setProgress(Float progress) {
		setProperty(NodePropertyName.PROGRESS, progress);
	}
	
	private Float getCalculatedProgress() {
		return getFloatProperty(NodePropertyName.PROGRESS);
	}


	@Override
	public void setDefaultProgress(Float progress) {
		setProperty(NodePropertyName.DEFAULT_PROGRESS, progress);
	}


	/**************** FLAGS FOR INHERITABLE ATTRIBUTES *****************/

	public boolean getProgressIsDefault() {
		return getCachedSubtasks().size() == 0 || getCalculatedProgress() == null;
	}

	public boolean getEndDateIsDefault() {
		return getCachedSubtasks().size() == 0 || getCalculatedEndDate() == null || getCalculatedEndDate() == DefaultValues.invalidEndDate;
	}

	public boolean getStartDateIsDefault() {
		return getCachedSubtasks().size() ==  0 || getCalculatedStartDate() == null|| getCalculatedStartDate() == DefaultValues.invalidStartDate;
	}

	public boolean getStatusIsDefault() {
		return true;
	}

	private boolean getDurationIsDefault() {
		return getCachedSubtasks().size() == 0 || getCalculatedDuration() == null;
	}

	/**************** RELATIONAL METHODS *****************/

	@Override
	public void addSubtask(Task child) {
		//		setEffort(child.getEffort() + getEffort());
		//		setStartDate(child.getStartDate() < getStartDate() ? child.getStartDate() : getStartDate());
		//		setEndDate(child.getEndDate() > getEndDate() ? child.getEndDate() : getEndDate());
		createRelationTo(Relations.HAS_SUBTASK, (AbstractPersistedModel<?>) child, true);
		updateAll();
	}

	@Override
	public void removeTaskRelation(Task child) {

		isParentOfChildOrException(child);
		manager.removeRelation(underlyingNode, ((AbstractPersistedModel<Project>) child).getNode(), Relations.HAS_SUBTASK);

	}

	/*
	 * @todo: what happens with the subtasks? 
	 */
	@Override
	public void removeSubtask(Task child){

		isParentOfChildOrException(child);

		manager.removeNode(((AbstractPersistedModel<?>) child).getNode());
		updateAll();
	}

	@Override
	public void addEffort(Effort effort) {

		Integer totalEffort = getEffort() + effort.getTime();
		createRelationTo(Relations.HAS_EFFORT, (AbstractPersistedModel<?>) effort, true);
		setEffort(totalEffort);

	}

	@Override
	public Collection<Effort> getEfforts() {

		Collection<Node> nodes = manager.getRelatedNodes(underlyingNode, Relations.HAS_EFFORT);
		return manager.getPersistedObjects(nodes, new ArrayList<Effort>(), PersistedEffort.class, Effort.class);

	}

	@Override
	public void deleteEffort(Effort effort) {

		if (!manager.relationExists(underlyingNode, ((AbstractPersistedModel<?>) effort).getNode(), Relations.HAS_EFFORT)) {
			throw new RelationNotFoundException();
		}

		Integer totalEffort = getEffort() - effort.getTime();
		setEffort(totalEffort);

		manager.removeNode(((AbstractPersistedModel<?>) effort).getNode());
	}

	public Project getProject() {

		Node n = manager.getRelatedNode(underlyingNode, Relations.PROJECT_HAS_TASK);

		if ( n != null ) {
			return new PersistedProject(manager, n);
		}

		return null;
	}

	@Override
	public void setAssignee(User u) {

		if (manager.relationExists(((AbstractPersistedModel<?>) u).getNode(), underlyingNode, Relations.DOES)) {
			throw new RelationAlreadyExistsException();
		}

		manager.removeRelationsTo(underlyingNode, Relations.DOES);
		createRelationshipFrom((AbstractPersistedModel<?>) u, Relations.DOES);
	}

	@Override
	public User getAssignee() {
		return getRelatedNode(Relations.DOES, PersistedUser.class, Direction.INCOMING);
	}

	@Override
	public String getParentId() {
		Task parent = getParent();
		return parent == null ? null : parent.getId();
	}

	@Override
	public Integer getSubtaskCount() {
		Collection<?> subtasks = getSubtasks();
		return subtasks != null ? subtasks.size() : 0;
	}


	/**************** UPDATE METHODS *****************/

	private void calculateProgressAndDuration() {

		Float oldProgress = getProgress();
		Integer oldDuratation = getDuration();

		Float totalProgress = (float) 0;
		Integer totalDuration = 0;

		for(Task t : getCachedSubtasks()) {
			totalDuration += t.getDuration();
			totalProgress += t.getDuration() * t.getProgress();
		}

		totalProgress = totalDuration > 0 ? totalProgress / totalDuration : 0;

		if (totalDuration != oldDuratation){
			setDuration(totalDuration);
			durationChanged(totalDuration);
		}

		if ( oldProgress != totalProgress ){
			setProgress(totalProgress);
			progressChanged(totalProgress);
		}
	}

	@Override
	public void updateProgress() {
		calculateProgressAndDuration();
	}

	@Override
	public void updateDuration() {
		calculateProgressAndDuration();
	}

	@Override
	public void updateDates() {

		Long startDate = DefaultValues.invalidStartDate;
		Long endDate = DefaultValues.invalidEndDate;
		Long currentStartDate = getStartDate();
		Long currentEndDate = getEndDate();

		for (Task t : getCachedSubtasks()) {

			Long sd = t.getStartDate();
			Long ed = t.getEndDate();

			startDate = 
					sd != null ? 
							(startDate != null ? 
									(startDate > sd ? sd : startDate) : sd) 
									: startDate;

									endDate = ed != null ? 
											(endDate != null ? 
													(endDate < ed ? ed : endDate) : ed)
													:endDate;

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

		//In this case is the same as updateProgress(); 
		//updateDuration();
	}

	@Override
	public void updateEfforts() {

		Collection<Effort> efforts = getEfforts();

		int totalEffort = 0;

		for (Effort effort : efforts) {
			totalEffort +=effort.getTime();
		}
		
		for (Task t : getSubtasks()) {
			totalEffort += t.getEffort();
		}

		setEffort(totalEffort);
	}

	@Override
	public void runDeletePreconditions() {

		for(Effort effort : getEfforts()) {
			deleteEffort(effort);
		}

		//		Project p = getProject();
		//		Task t = getParent();
		//
		//		if( p != null ){
		//			p.removeTask(this);
		//		} else if (t != null) {
		//			t.removeSubtask(t);
		//		}


	}

	/**************** PROPAGATION METHODS *****************/

	private void startDateChanged(Long startDate) {
		Task parent = getParent();

		if (parent != null)
			getParent().updateDates();
		
		Project project = getProject();
		if ( project != null ) {
			project.updateAll();
		}
	}

	private void endDateChanged(Long endDate) {
		Task parent = getParent();

		if (parent != null)
			getParent().updateDates();
		
		Project project = getProject();
		if ( project != null ) {
			project.updateAll();
		}
	}

	private void durationChanged(Integer duration) {
		Task parent = getParent();

		if (parent != null)
			getParent().updateDuration();
		
		Project project = getProject();
		if ( project != null ) {
			project.updateAll();
		}
	}

	private void progressChanged(Float progress){
		Task parent = getParent();

		if (parent != null)
			getParent().updateProgress();
		
		Project project = getProject();
		if ( project != null ) {
			project.updateAll();
		}
	}

	private void effortChanged(Integer effort) {
		Task parent = getParent();

		if (parent != null)
			getParent().updateEfforts();

		Project project = getProject();
		if ( project != null ) {
			project.updateAll();
		}
	}



	/**************** HELPER METHODS *****************/
	private List<PersistedTask> getCachedSubtasks(){

		subtasks = getRelatedNodes(Relations.HAS_SUBTASK, PersistedTask.class, Direction.OUTGOING);
		return subtasks;
	}

	@Override
	public List<Task> getSubtasks(){
		return getRelatedNodes(Relations.HAS_SUBTASK, PersistedTask.class, Task.class, Direction.OUTGOING);
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof PersistedTask
				&& ((PersistedTask) obj).getNode().equals(underlyingNode);
	}

	@Override
	public Task getParent() {

		Task parent = getRelatedNode(Relations.HAS_SUBTASK, PersistedTask.class, Direction.INCOMING);

		if (parent != null &&  parent.equals(this) ){
			throw new RootApplicationException("Parent and child can not be the same");
		}

		return parent;
	}

	private void isParentOfChildOrException(Task child) {
		if (!manager.relationExists(underlyingNode, ((AbstractPersistedModel<?>) child).getNode(), Relations.HAS_SUBTASK)) {
			throw new RelationNotFoundException();
		}
	}

	@Override
	protected void initializeVariables() {
		if ( getDefaultStartDate() == null )
			setDefaultStartDate(DefaultValues.invalidStartDate);

		if ( getDefaultEndDate() == null )
			setDefaultEndDate(DefaultValues.invalidEndDate);

		if ( getDefaultProgress() == null )
			setDefaultProgress(DefaultValues.defaultProgress);

		if ( getDefaultDuration() == null )
			setDefaultDuration(DefaultValues.defaultDuration);

		if ( getEffort() == null )
			setEffort(DefaultValues.defaultEffort);
	}

	@Override
	public Set<AbstractPersistedModel<?>> loadObjectsToInform() {
		HashSet<AbstractPersistedModel<?>> objects = new HashSet<AbstractPersistedModel<?>>(); 

		Project p = getProject();
		if ( p != null)
			objects.add((AbstractPersistedModel<?>) p);

		Task parentTask = getParent();
		if( parentTask != null )
			objects.add((AbstractPersistedModel<?>) parentTask);

		return objects;
	}

}
























































