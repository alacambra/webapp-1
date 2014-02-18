package poolingpeople.exporter.redmine;

// Generated Feb 17, 2014 1:20:17 PM by Hibernate Tools 4.0.0

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Home object for domain model class Queries.
 * @see poolingpeople.exporter.redmine.Queries
 * @author Hibernate Tools
 */
@Stateless
public class QueriesHome {

	private static final Log log = LogFactory.getLog(QueriesHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(Queries transientInstance) {
		log.debug("persisting Queries instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(Queries persistentInstance) {
		log.debug("removing Queries instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public Queries merge(Queries detachedInstance) {
		log.debug("merging Queries instance");
		try {
			Queries result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public Queries findById(Integer id) {
		log.debug("getting Queries instance with id: " + id);
		try {
			Queries instance = entityManager.find(Queries.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
}
