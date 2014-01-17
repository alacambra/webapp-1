package poolingpeople.webapplication.business.boundary;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.AnnotatedField;
import javax.enterprise.inject.spi.InjectionPoint;

import org.codehaus.jackson.Version;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.module.SimpleModule;
import org.neo4j.kernel.impl.locking.ThreadRepository.Task;

import poolingpeople.webapplication.business.project.boundary.ProjectMixin;
import poolingpeople.webapplication.business.project.entity.Project;
import poolingpeople.webapplication.business.task.boundary.EffortMixin;
import poolingpeople.webapplication.business.task.boundary.TaskMixin;
import poolingpeople.webapplication.business.task.entity.Effort;
import poolingpeople.webapplication.business.user.boundary.UserMixin;
import poolingpeople.webapplication.business.user.entity.User;

public class ObjectMapperProducerNew {

	@Produces
	public ObjectMapper produceObjectMapper(InjectionPoint injectionPoint) {
		return hasFieldAnnotation(injectionPoint) ? createObjectMapper(injectionPoint) : null;
	}

	private boolean hasFieldAnnotation(InjectionPoint point) {
		return (point.getAnnotated() != null && point.getAnnotated() instanceof AnnotatedField);
	}

	private ObjectMapper createObjectMapper(InjectionPoint injectionPoint) {

		ObjectMapper mapper = new ObjectMapper();

		mapper.registerModule(
				new MixinModule()
				.addMixin(Task.class, TaskMixin.class)
				.addMixin(Effort.class, EffortMixin.class)
				.addMixin(Project.class, ProjectMixin.class)
				.addMixin(User.class, UserMixin.class)

				);
		return mapper;
	}

	public class MixinModule extends SimpleModule {
		public MixinModule() {
			super("ppSerializer", new Version(0, 0, 1, null));
		}

		public MixinModule addMixin(Class<?> entity, Class<?> mixin) {
			setMixInAnnotation(entity, mixin);
			return this;
		}
	}

}
