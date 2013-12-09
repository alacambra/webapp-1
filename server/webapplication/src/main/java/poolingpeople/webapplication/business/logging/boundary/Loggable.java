package poolingpeople.webapplication.business.logging.boundary;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.interceptor.InterceptorBinding;

/**
 * @Loggable allows Methods, or at class level (all methods) to be logged
 * LoggerInterceptor contains the logging functionals
 * @see LoggerInterceptor 
 */
@InterceptorBinding
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD,ElementType.TYPE})
public @interface Loggable {
}
