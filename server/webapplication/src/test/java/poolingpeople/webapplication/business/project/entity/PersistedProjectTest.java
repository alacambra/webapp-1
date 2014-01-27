package poolingpeople.webapplication.business.project.entity;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Transaction;
import org.neo4j.tooling.GlobalGraphOperations;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.UUIDIndexContainer;
import poolingpeople.webapplication.business.project.boundary.ProjectDTO;
import poolingpeople.webapplication.business.task.entity.PersistedTask;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.utils.helpers.FileLoader;
import poolingpeople.webapplication.business.utils.helpers.Neo4jRunner;

@RunWith(Neo4jRunner.class)
public class PersistedProjectTest{

	PersistedProject target;
	NeoManager manager;
	Transaction tx;
	String structurePath = "cypher-graphs/";
	String unrelatedStructureFileName =  "project-task-effort-unrelated.cy";
	String relatedStructureFileName =  "project-task-effort-related.cy";

	public void setManager(NeoManager manager) {
		this.manager = manager;
	}

	private void addUnrelatedStructure() {
		manager.runCypherQuery(FileLoader.getText(structurePath + unrelatedStructureFileName), null);
		Iterable<Node> iterable = GlobalGraphOperations.at(manager.getGraphDbService()).getAllNodes();
		for(Node n : iterable) {
			manager.addToIndex(n, new UUIDIndexContainer((String) n.getProperty("ID")));
		}
	}

	private void addRelatedStructure() {
		manager.runCypherQuery(FileLoader.getText(structurePath + relatedStructureFileName), null);
		Iterable<Node> iterable = GlobalGraphOperations.at(manager.getGraphDbService()).getAllNodes();
		for(Node n : iterable) {
			manager.addToIndex(n, new UUIDIndexContainer((String) n.getProperty("ID")));
		}
	}

	@Before
	public void setUp() {
		
	}

	@After
	public void tearDown() {
		Iterable<Node> iterable = GlobalGraphOperations.at(manager.getGraphDbService()).getAllNodes();
		for(Node n : iterable) {
			manager.removeNode(n);
		}
	}


	@Test
	public void testPersistedProjectConstructors() {
		ProjectDTO dto = new ProjectDTO();
		dto.setTitle("title");

		target = new PersistedProject(manager, dto);

		assertEquals("title", target.getTitle());
		assertEquals(target, new PersistedProject(manager, target.getId()));
		assertEquals(target, new PersistedProject(manager, target.getNode()));

	}

	@Test
	public void testAddTaskDatesAreCorrect() {

		addUnrelatedStructure();
		target = new PersistedProject(manager, "1");
		assertEquals(new Long(10), target.getStartDate());
		assertEquals(new Long(20), target.getEndDate());

		Task t2 = new PersistedTask(manager, "3");
		target.addTask(t2);
		assertEquals(new Long(10), target.getStartDate());
		assertEquals(new Long(51), target.getEndDate());

		Task t1 = new PersistedTask(manager, "2");
		target.addTask(t1);
		assertEquals(new Long(1), target.getStartDate());
		assertEquals(new Long(51), target.getEndDate());

	}

	@Test
	public void testAddTaskProgressIsCorrect() {

		addUnrelatedStructure();
		target = new PersistedProject(manager, "1");
		Task t2 = new PersistedTask(manager, "3");
		target.addTask(t2);
		Task t1 = new PersistedTask(manager, "2");
		target.addTask(t1);

		String q = "MATCH (n:TASK) return sum(n.PROGRESS * n.DURATION) / sum(n.DURATION) as total ";
		Double expectedProgress = (Double) manager.runCypherQuery(q, null).columnAs("total").next();

		Float f = Float.parseFloat(expectedProgress.toString());
		assertEquals(f, target.getProgress());

	}

	@Test
	public void testAddTaskEffortIsCorrect() {

		addUnrelatedStructure();
		target = new PersistedProject(manager, "1");
		Task t2 = new PersistedTask(manager, "3");
		target.addTask(t2);
		Task t1 = new PersistedTask(manager, "2");
		target.addTask(t1);

		String q = "MATCH (n:EFFORT) RETURN sum(n.time) as total";
		Integer totalEffort = (Integer) manager.runCypherQuery(q, null).columnAs("total").next();
		assertEquals(totalEffort, target.getEffort());
	}

	/*
	 * @ASK: Shpuld the projects date also compute?
	 */
	@Test
	public void testRemoveTaskDatesAreCorrect() {

		addRelatedStructure();
		target = new PersistedProject(manager, "1");

		target.updateAll();

		Task t2 = new PersistedTask(manager, "3");
		Task t1 = new PersistedTask(manager, "2");

		assertEquals(new Long(1), target.getStartDate());
		assertEquals(new Long(51), target.getEndDate());

		target.removeTask(t1);
		assertEquals(new Long(10), target.getStartDate());
		assertEquals(new Long(51), target.getEndDate());

		target.removeTask(t2);
		assertEquals(new Long(10), target.getStartDate());
		assertEquals(new Long(20), target.getEndDate());

	}

	@Test
	public void testRemoveTaskProgressIsCorrect() {
		addRelatedStructure();

		target = new PersistedProject(manager, "1");
		target.updateAll();
		
		String q = "MATCH (n:TASK) return sum(n.DEFAULT_PROGRESS * n.DURATION) / sum(n.DURATION) as total ";
		Double expectedProgress = (Double) manager.runCypherQuery(q, null).columnAs("total").next();
		Float f = Float.parseFloat(expectedProgress.toString());
		assertEquals(f, target.getProgress());
		
		Task t1 = new PersistedTask(manager, "2");
		target.removeTask(t1);
		expectedProgress = (Double) manager.runCypherQuery(q, null).columnAs("total").next();
		f = Float.parseFloat(expectedProgress.toString());
		assertEquals(f, target.getProgress());
		
		Task t2 = new PersistedTask(manager, "3");
		target.removeTask(t2);
		assertNull(target.getProgress());
	}

	@Test
	public void testRemoveTaskEffortIsCorrect() {
		addRelatedStructure();
		target = new PersistedProject(manager, "1");
		
		Task t1 = new PersistedTask(manager, "2");
		target.removeTask(t1);
		String q = "MATCH (n:EFFORT) RETURN sum(n.time) as total";
		Integer totalEffort = (Integer) manager.runCypherQuery(q, null).columnAs("total").next();
		assertEquals(totalEffort, target.getEffort());
		
		Task t2 = new PersistedTask(manager, "3");
		q = "MATCH (n:EFFORT) RETURN sum(n.time) as total";
		totalEffort = (Integer) manager.runCypherQuery(q, null).columnAs("total").next();
		target.removeTask(t2);
		assertEquals(totalEffort, target.getEffort());
		
		
	}

	@Test
	public void testGetTasks() {
		addRelatedStructure();
		target = new PersistedProject(manager, "1");
		assertEquals(2, target.getTasks().size());
	}
}






















































































