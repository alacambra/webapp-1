package poolingpeople.webapplication.business.entity;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.interceptor.AroundInvoke;
import javax.interceptor.InterceptorBinding;
import javax.interceptor.InvocationContext;

@InterceptorBinding
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface EntityPersistenceRollback {
}
