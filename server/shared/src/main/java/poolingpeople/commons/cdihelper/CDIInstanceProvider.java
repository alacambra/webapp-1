package poolingpeople.commons.cdihelper;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.spi.CreationalContext;
import javax.enterprise.inject.spi.Bean;
import javax.enterprise.inject.spi.BeanManager;

import org.jboss.weld.Weld;

@ApplicationScoped
public class CDIInstanceProvider implements InstanceProvider{

	@Override
	public <T> T getInstance(Class<T> clazz) {
		BeanManager manager = Weld.current().getBeanManager();
		Bean<?> bean = manager.resolve(manager.getBeans(clazz));
		
		if(bean == null) throw new RuntimeException("Bean could not be resolved for Class: " + clazz.toString());
		
		CreationalContext<?> cc = manager.createCreationalContext(bean);
		return clazz.cast(manager.getReference(bean, clazz, cc));
	}

}
