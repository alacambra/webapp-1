package poolingpeople.exporter.redmine;

// Generated Feb 17, 2014 1:20:17 PM by Hibernate Tools 4.0.0

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Home object for domain model class WikiRedirects.
 * @see poolingpeople.exporter.redmine.WikiRedirects
 * @author Hibernate Tools
 */
@Stateless
public class WikiRedirectsHome {

	private static final Log log = LogFactory.getLog(WikiRedirectsHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(WikiRedirects transientInstance) {
		log.debug("persisting WikiRedirects instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(WikiRedirects persistentInstance) {
		log.debug("removing WikiRedirects instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public WikiRedirects merge(WikiRedirects detachedInstance) {
		log.debug("merging WikiRedirects instance");
		try {
			WikiRedirects result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public WikiRedirects findById(Integer id) {
		log.debug("getting WikiRedirects instance with id: " + id);
		try {
			WikiRedirects instance = entityManager
					.find(WikiRedirects.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
}
