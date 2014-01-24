package poolingpeople.webapplication.business.project.entity;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Node;
import org.neo4j.graphdb.Transaction;
import org.neo4j.kernel.impl.transaction.ThreadAssociatedWithOtherTransactionException;
import org.neo4j.tooling.GlobalGraphOperations;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.neo4j.UUIDIndexContainer;
import poolingpeople.webapplication.business.project.boundary.ProjectDTO;
import poolingpeople.webapplication.business.task.boundary.TaskDTO;
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
	String structureFileName =  "project-task-effort-unrelated.cy";

	public void setManager(NeoManager manager) {
		this.manager = manager;
	}
	
	@Before
	public void setUp() {
		manager.runCypherQuery(FileLoader.getText(structurePath + structureFileName), null);
		Iterable<Node> iterable = GlobalGraphOperations.at(manager.getGraphDbService()).getAllNodes();
		for(Node n : iterable) {
			manager.addToIndex(n, new UUIDIndexContainer((String) n.getProperty("ID")));
		}
		
	}

	@After
	public void tearDown() {
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
	@Ignore
	public void testGetTitle() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testSetTitle() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testGetDescription() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testSetDescription() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testGetStartDate() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testSetStartDate() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testGetEndDate() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testSetEndDate() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testEqualsObject() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testAddSubtask() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testGetStatusInteger() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testSetStatusInteger() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testGetStatus() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testSetStatus() {
		fail("Not yet implemented");
	}

	@Test
	public void testAddTaskDatesAreCorrect() {
		
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
		
		target.getProgress();
		
	}

	@Test
	public void testAddTaskProgressIsCorrect() {
		
		target = new PersistedProject(manager, "1");
		Float expectedProgress = new Float((0.25 * 34 + 0.5 * 100) / (100 + 34));
		Task t2 = new PersistedTask(manager, "3");
		target.addTask(t2);
		Task t1 = new PersistedTask(manager, "2");
		target.addTask(t1);
		assertEquals(expectedProgress, target.getProgress());
		
		target.getProgress();
		
	}

	@Test
	@Ignore
	public void testRemoveTask() {
		fail("Not yet implemented");
	}

	@Test
	@Ignore
	public void testGetTasks() {
		fail("Not yet implemented");
	}

}






















































































