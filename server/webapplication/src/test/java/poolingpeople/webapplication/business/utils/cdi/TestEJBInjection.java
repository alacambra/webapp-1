package poolingpeople.webapplication.business.utils.cdi;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import poolingpeople.webapplication.business.task.boundary.TaskBoundary;

/**
 *
 * @author qaiser
 */
public class TestEJBInjection {

    private static BeanManagerHelper beanHelper;
    
    @BeforeClass
    public static void initBeanManager(){
        beanHelper = new BeanManagerHelper();
    }
    
    @Test
    public void shouldInject(){
        MyEjbService ejbService = beanHelper.createInstance(MyEjbService.class);
        
    }
}
