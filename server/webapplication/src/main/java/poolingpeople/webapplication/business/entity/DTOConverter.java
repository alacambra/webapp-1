package poolingpeople.webapplication.business.entity;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import javax.ejb.Stateless;

@Stateless
public class DTOConverter {

	public <T> T fromDTOtoPersitedBean(Object dto, T bean) {
		
		Method[] methods = dto.getClass().getMethods();
		
		for(int i = 0; i < methods.length; i++) {
			Method dtoMethod = methods[i];
			Method beanMethod = getSetterMethod(dtoMethod.getName(), dtoMethod.getReturnType(), bean);
			
			if(beanMethod == null){
				continue;
			}
			
			try {
				beanMethod.invoke(bean, dtoMethod.invoke(dto));
			} catch (IllegalAccessException e) {
			} catch (IllegalArgumentException e) {
			} catch (InvocationTargetException e) {
			}
			
		}
		
		return bean;
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

	public static void main(String[] args){
		System.out.println("dgetSomething".replaceAll("^get([A-Z][\\w\\d]+)$", "set$1"));
	}
	
}
