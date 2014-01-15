package poolingpeople.webapplication.business.task.boundary;

import javax.inject.Inject;
import javax.ws.rs.core.Response;
import org.jglue.cdiunit.AdditionalClasses;
import org.jglue.cdiunit.CdiRunner;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import poolingpeople.webapplication.business.boundary.ObjectMapperProducer;
import poolingpeople.webapplication.business.neo4j.GraphDatabaseServiceProducer;
import poolingpeople.webapplication.business.neo4j.TransactionInterceptor;

@RunWith(CdiRunner.class)
@AdditionalClasses({ObjectMapperProducer.class, GraphDatabaseServiceProducer.class, TransactionInterceptor.class})
public class TaskBoundaryTest {

    @Inject
    TaskBoundary cut;

    @Before
    public void setUp() {
    }

    @After
    public void tearDown() {
    }

    @Test
    @Ignore
    public void testGetTaskById() throws Exception {
        final String createTask = "{\"title\":\"test\"}";
        cut.saveTask(createTask);
        Response response = cut.getTaskById(""); //what id should i provide ? 
        assertEquals(Response.Status.OK, response.getStatusInfo());
        //TODO check if response.getEntity equals createTask JSON
    }

    @Test
    public void testGetAllTask() throws Exception {
//<<<<<<< HEAD
//        when(entityFactoryMock.getAllTask()).thenReturn(persistedTaskListMock);
////        when(objectMapperMock.thenReturn(objectWritterMock);
//        when(objectWritterMock.writeValueAsString(persistedTaskListMock)).thenReturn("{}");
//        assertEquals(Response.Status.OK, cut.getAllTask().getStatusInfo());
//        verify(entityFactoryMock, times(1)).getAllTask();
////        verify(objectMapperMock, times(1)).writerWithView(View.SampleView.class);
//        verify(objectWritterMock, times(1)).writeValueAsString(persistedTaskListMock);
//=======
        final String createTask = "{\"title\":\"test\"}";
        cut.saveTask(createTask);
        Response allTask = cut.getAllTask();
        assertEquals(Response.Status.OK, allTask.getStatusInfo());
        assertNotNull(allTask.getEntity());
//>>>>>>> 571d2d5ddbaf68691dda80210f12d948539309bd
    }

    @Test
    public void testSaveTask() throws Exception {
        final String createTask = "{\"title\":\"test\"}";
        cut.saveTask(createTask);
        Response response = cut.saveTask(createTask);
        assertEquals(Response.Status.OK, response.getStatusInfo());
    }

    @Test @Ignore
    //cant determine which id should be provided
    public void testUpdateTask() throws Exception {
    }

    @Test @Ignore
    //cant determine which id should be provided
    public void testDeleteTask() throws Exception {
        
    }

}
