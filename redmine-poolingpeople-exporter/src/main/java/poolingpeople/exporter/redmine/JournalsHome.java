package poolingpeople.exporter.redmine;

// Generated Feb 17, 2014 1:20:17 PM by Hibernate Tools 4.0.0

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Home object for domain model class Journals.
 * @see poolingpeople.exporter.redmine.Journals
 * @author Hibernate Tools
 */
@Stateless
public class JournalsHome {

	private static final Log log = LogFactory.getLog(JournalsHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Journals transientInstance) {
		log.debug("persisting Journals instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Journals persistentInstance) {
		log.debug("removing Journals instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Journals merge(Journals detachedInstance) {
		log.debug("merging Journals instance");
		try {
			Journals result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Journals findById(Integer id) {
		log.debug("getting Journals instance with id: " + id);
		try {
			Journals instance = entityManager.find(Journals.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
}
