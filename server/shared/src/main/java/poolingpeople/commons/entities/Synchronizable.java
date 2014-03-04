package poolingpeople.commons.entities;

public interface Synchronizable<T> {
	void synchronizeWith(T tplObject);
}
