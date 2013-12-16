package poolingpeople.webapplication.business.boundary;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.AnnotatedField;
import javax.enterprise.inject.spi.InjectionPoint;

import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;

public class ObjectMapperProducer {

	@Produces
	public ObjectMapper produceObjectMapper(InjectionPoint injectionPoint) {
		return hasFieldAnnotation(injectionPoint) ? createObjectMapper(injectionPoint) : null;
	}

	private boolean hasFieldAnnotation(InjectionPoint point) {
		return (point.getAnnotated() == null || !(point.getAnnotated() instanceof AnnotatedField)) ? false
				: true;
	}

	private ObjectMapper createObjectMapper(InjectionPoint injectionPoint) {
		Class<?> entity = getEntityClassFromAnnotation(injectionPoint);
		Class<?> mixin  = getMixinClassFromAnnotation(injectionPoint);
		ObjectMapper mapper = new ObjectMapper();
		mapper.registerModule(new TaskMixinModule(mixin.getSimpleName(),
				entity, mixin));
		return mapper;
	}

	private Class<?> getEntityClassFromAnnotation(InjectionPoint point) {
		AnnotatedField<SetMixinView> field = (AnnotatedField<SetMixinView>) point
				.getAnnotated();
		SetMixinView mixinView = field.getAnnotation(SetMixinView.class);
		return (mixinView != null) ? mixinView.entity() : null;
	}

	private Class<?> getMixinClassFromAnnotation(InjectionPoint point) {
		AnnotatedField<SetMixinView> field = (AnnotatedField<SetMixinView>) point
				.getAnnotated();
		SetMixinView mixinView = field.getAnnotation(SetMixinView.class);
		return (mixinView != null) ? mixinView.mixin() : null;
	}
	
	public class TaskMixinModule extends SimpleModule {
		public TaskMixinModule(String mixinName, Class<?> entity, Class<?> mixin) {
			super(mixinName, new Version(0, 0, 1, null));
			setMixInAnnotation(entity, mixin);
		}
	}

}
