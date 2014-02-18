package poolingpeople.persistence.neo4j.ineritance;

import java.lang.annotation.Annotation;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.inject.Inject;

import poolingpeople.commons.entities.IgnoreAttribute;
import poolingpeople.commons.exceptions.RootApplicationException;
import poolingpeople.persistence.neo4j.*;
import poolingpeople.persistence.neo4j.entities.*;
public class InheritanceManager {

	@Inject NeoManager manager;
	
	public void updateObject(AbstractPersistedModel<?> object){
		
	}
	
	public void deleteObject(AbstractPersistedModel<?> object){
		
		Method method[] = object.getClass().getMethods();
		
		for(int i = 0; i < method.length; i++){
			
			Method m = method[i];
			Annotation[] annotations = m.getAnnotations();
			
			for(int j = 0; j < method.length; j++){
			
				Annotation a = annotations[j];
				if ( a.getClass().isAssignableFrom(Slave.class) ){
					try {
						
						AbstractPersistedModel<?> slave = (AbstractPersistedModel<?>) m.invoke(object, null);
						deleteObject(slave);
						manager.removeNode(object.getNode());
						
					} catch (IllegalAccessException | IllegalArgumentException
							| InvocationTargetException e) {
						
						throw new RootApplicationException(e);
					}
				}
			}
		}
	}
	
	public void createObject(AbstractPersistedModel<?> object){
		
	}
	
	private void copyFromTemplate(Object tplObject) {

		Method[] methods = tplObject.getClass().getMethods();

		for(int i = 0; i < methods.length; i++) {
			Method dtoMethod = methods[i];
			if(dtoMethod.isAnnotationPresent(IgnoreAttribute.class)) {
				continue;
			}

			Method beanMethod = getSetterMethod(dtoMethod.getName(), dtoMethod.getReturnType(), this);

			if(beanMethod == null){
				continue;
			}

			try {

				if ( dtoMethod.invoke(tplObject) == null )
					continue;

				beanMethod.invoke(this, dtoMethod.invoke(tplObject));

			} catch (Exception e) {
				throw new RootApplicationException(
						"error for method " + tplObject.getClass().getCanonicalName() + "." + dtoMethod.getName() + "|" 
						+ this.getClass().getCanonicalName() + "." + beanMethod.getName() + ":" + e.getMessage(), e);
			}
		}
	}
	
	private Method getSetterMethod(String getterName, Class<?> param, Object target) {

		String setterName = getterName.replaceAll("^get([A-Z][\\w\\d]+)$", "set$1");
		try {
			return setterName.equals(getterName) ? null : target.getClass().getMethod(setterName, param);
		} catch (NoSuchMethodException e) {
			return null;
		} catch (SecurityException e) {
			return null;
		}
	}
}
