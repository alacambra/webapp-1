package poolingpeople.webapplication.business.utils.cdi;

import org.junit.BeforeClass;
import org.junit.Test;

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
        ejbService.business();
    }
}
