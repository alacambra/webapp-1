package poolingpeople.webapplication.business.task.entity;

import org.junit.Ignore;
import org.junit.Test;

import static org.junit.Assert.*;
import poolingpeople.commons.entities.Project;
import poolingpeople.commons.entities.Task;
import poolingpeople.persistance.neo4j.AbstractPersitanceTest;
import poolingpeople.persistence.neo4j.entities.PersistedProject;
import poolingpeople.persistence.neo4j.entities.PersistedTask;

public class PersistedTaskTest extends AbstractPersitanceTest{
	
	String relatedStructure = "project-task-task-effort-related.cy";
	String unrelatedStructure = "project-task-task-effort-unrelated.cy";

	
	private void loadRelatedStructure() {
		addCypherStructure(relatedStructure);
	}
	
	private void loadUnrelatedStructure() {
		addCypherStructure(unrelatedStructure);
	}
	
	
	@Test
	@Ignore
	public void testRunDeletePreconditions() {
	}

//	@Test
//	public void testPersistedTaskConstructors() {
//		TaskDTO dto = new TaskDTO();
//		dto.setTitle("title");
//
//		PersistedTask target = new PersistedTask(manager, dto);
//
//		assertEquals("title", target.getTitle());
//		assertEquals(target, new PersistedTask(manager, target.getId()));
//		assertEquals(target, new PersistedTask(manager, target.getNode()));
//
//	}

	@Test
	@Ignore
	public void testGetDuration() {
	}

	@Test
	@Ignore
	public void testSetDefaultDuration() {
	}

	@Test
	@Ignore
	public void testGetEffort() {
	}

	@Test
	public void datesAreCorrect() {
		
		loadUnrelatedStructure();
		Task t1 = new PersistedTask(manager, "T1");
		assertEquals(new Long(1), t1.getStartDate());
		assertEquals(new Long(2), t1.getEndDate());
		
		Task t11 = new PersistedTask(manager, "T11");
		t1.addSubtask(t11);
		assertEquals(new Long(34), t1.getStartDate());
		assertEquals(new Long(51), t1.getEndDate());
		assertEquals(new Long(34), t11.getStartDate());
		assertEquals(new Long(51), t11.getEndDate());
		
		Task t111 = new PersistedTask(manager, "T111");
		
		t11.addSubtask(t111);
		assertEquals(new Long(4), t1.getStartDate());
		assertEquals(new Long(510), t1.getEndDate());
		assertEquals(new Long(4), t11.getStartDate());
		assertEquals(new Long(510), t11.getEndDate());
		assertEquals(new Long(4), t111.getStartDate());
		assertEquals(new Long(510), t111.getEndDate());
		
		Task t112 = new PersistedTask(manager, "T112");
		t11.addSubtask(t112);
		assertEquals(new Long(4), t1.getStartDate());
		assertEquals(new Long(510), t1.getEndDate());
		assertEquals(new Long(4), t11.getStartDate());
		assertEquals(new Long(510), t11.getEndDate());
		assertEquals(new Long(4), t111.getStartDate());
		assertEquals(new Long(510), t111.getEndDate());
		assertEquals(new Long(24), t112.getStartDate());
		assertEquals(new Long(51), t112.getEndDate());
		
		Project p = new PersistedProject(manager, "P1");
		p.addTask(t1);
		assertEquals(new Long(4), p.getStartDate());
		assertEquals(new Long(510), p.getEndDate());
		
		t1.setDefaultStartDate(23L);
		Task t12 = new PersistedTask(manager, "T12");
		t1.addSubtask(t12);
		assertEquals(new Long(3), t1.getStartDate());
		assertEquals(new Long(510), t1.getEndDate());
		
		
	}

	@Test
	public void testProgressIsCorrect() {
		loadUnrelatedStructure();
		Task t1 = new PersistedTask(manager, "T1");
		Task t11 = new PersistedTask(manager, "T11");
		Task t111 = new PersistedTask(manager, "T111");
		Task t112 = new PersistedTask(manager, "T112");
		Task t12 = new PersistedTask(manager, "T12");
		Task t121 = new PersistedTask(manager, "T121");
		Task t122= new PersistedTask(manager, "T122");
		
		t1.addSubtask(t11);
		t1.addSubtask(t12);
		t11.addSubtask(t111);
		t11.addSubtask(t112);
		t12.addSubtask(t121);
		t12.addSubtask(t122);
		
		String q = "MATCH (n:TASK)-->()-->(child:TASK) return sum(child.DEFAULT_PROGRESS * child.DEFAULT_DURATION) / sum(child.DEFAULT_DURATION) as total ";
		Double expectedProgress = (Double) manager.runCypherQuery(q, null).columnAs("total").next();
		
		Float f = Float.parseFloat(expectedProgress.toString());
		assertEquals(f, t1.getProgress());

	}
	
//	@Test
//	public void effortIsCorrect() {
//		loadUnrelatedStructure();
//		Task t1 = new PersistedTask(manager, "T1");
//		Task t11 = new PersistedTask(manager, "T11");
//		Task t111 = new PersistedTask(manager, "T111");
//		Task t112 = new PersistedTask(manager, "T112");
//		Task t12 = new PersistedTask(manager, "T12");
//		Task t121 = new PersistedTask(manager, "T121");
//		Task t122= new PersistedTask(manager, "T122");
//		
//		t1.addSubtask(t11);
//		t11.addSubtask(t111);
//		t11.addSubtask(t112);
//		t1.addSubtask(t12);
//		t12.addSubtask(t121);
//		t12.addSubtask(t122);
//		
//		
//		EffortDto dto = new EffortDto();
//		String q = "MATCH (task:TASK)-[:HAS_EFFORT]->(effort) RETURN sum(effort.TIME) as total";
//		dto.setTime(10);
//		Effort effort = new PersistedEffort(manager, dto);
//		t111.addEffort(effort);
//		Integer totalEffort = Integer.parseInt(manager.runCypherQuery(q, null).columnAs("total").next().toString());
//		assertEquals(totalEffort, t1.getEffort());
//	}
	
	@Test
	public void durationIsCorrect() {
		loadUnrelatedStructure();
		Task t1 = new PersistedTask(manager, "T1");
		Task t11 = new PersistedTask(manager, "T11");
		Task t111 = new PersistedTask(manager, "T111");
		Task t112 = new PersistedTask(manager, "T112");
		Task t12 = new PersistedTask(manager, "T12");
		Task t121 = new PersistedTask(manager, "T121");
		Task t122= new PersistedTask(manager, "T122");
		
		t1.addSubtask(t11);
		t1.addSubtask(t12);
		t11.addSubtask(t111);
		t11.addSubtask(t112);
		t12.addSubtask(t121);
		t12.addSubtask(t122);
		
		String q = "MATCH (n:TASK)-->()-->(child:TASK) return sum(child.DEFAULT_DURATION) as total ";
		Long expectedProgress = (Long) manager.runCypherQuery(q, null).columnAs("total").next();
		
		Integer f = Integer.parseInt(expectedProgress.toString());
		assertEquals(f, t1.getDuration());
	}

}	
