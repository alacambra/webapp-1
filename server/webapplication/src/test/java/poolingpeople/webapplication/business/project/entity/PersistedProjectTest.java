package poolingpeople.webapplication.business.project.entity;

import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.Transaction;

import poolingpeople.webapplication.business.neo4j.NeoManager;
import poolingpeople.webapplication.business.project.boundary.ProjectDTO;
import poolingpeople.webapplication.business.task.boundary.TaskDTO;
import poolingpeople.webapplication.business.task.entity.PersistedTask;
import poolingpeople.webapplication.business.task.entity.Task;
import poolingpeople.webapplication.business.utils.cdi.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.utils.helpers.Neo4jRunner;

@RunWith(Neo4jRunner.class)
public class PersistedProjectTest{


	PersistedProject target;
	NeoManager manager;
	Transaction tx;
	GraphDatabaseService graphDb;

	public void setManager(NeoManager manager) {
		this.manager = manager;
	}
	
	@Before
	public void setUp() {
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
	@Ignore
	public void testAddTask() {
		Long startDate = (long) 5;
		target = new PersistedProject(manager, new ProjectDTO());
		TaskDTO dto = new TaskDTO();
		dto.setStartDate(startDate);
		Task task = new PersistedTask(manager, dto);
		target.addTask(task);
		assertEquals(startDate, target.getStartDate());
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
