package poolingpeople.webapplication.business.utils.cdi;

import java.lang.annotation.Annotation;
import javax.enterprise.inject.spi.BeanManager;
import org.apache.deltaspike.cdise.api.CdiContainer;
import org.apache.deltaspike.cdise.api.CdiContainerLoader;
import org.apache.deltaspike.core.api.provider.BeanProvider;

/**
 * http://deltaspike.apache.org/documentation.html
 * @author qaiser
 */
public class BeanManagerHelper {
    private CdiContainer cdiContainer;

    public BeanManagerHelper() {
        cdiContainer = CdiContainerLoader.getCdiContainer();
        cdiContainer.boot();
        cdiContainer.getContextControl().startContexts();
    }

    public <T> T createInstance(Class<T> clazz) {
        return BeanProvider.getContextualReference(clazz);
    }

    public <T> T createInstanceWithAnnotations(Class<T> clazz, Annotation... annotations) {
        return BeanProvider.getContextualReference(clazz, annotations);
    }

    public BeanManager getBeanManager(){
        return cdiContainer.getBeanManager();
    }
    
    public void shutDown(){
        cdiContainer.shutdown();
    }
}
