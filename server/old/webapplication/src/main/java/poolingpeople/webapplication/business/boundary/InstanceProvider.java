package poolingpeople.webapplication.business.boundary;

public interface InstanceProvider {
	<T> T getInstance(Class<T> clazz);
}
