package poolingpeople.persistance.neo4j.ingestor;

// Generated Feb 17, 2014 1:20:17 PM by Hibernate Tools 4.0.0

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Home object for domain model class EnabledModules.
 * @see poolingpeople.persistance.neo4j.ingestor.EnabledModules
 * @author Hibernate Tools
 */
@Stateless
public class EnabledModulesHome {

	private static final Log log = LogFactory.getLog(EnabledModulesHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(EnabledModules transientInstance) {
		log.debug("persisting EnabledModules instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(EnabledModules persistentInstance) {
		log.debug("removing EnabledModules instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public EnabledModules merge(EnabledModules detachedInstance) {
		log.debug("merging EnabledModules instance");
		try {
			EnabledModules result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public EnabledModules findById(Integer id) {
		log.debug("getting EnabledModules instance with id: " + id);
		try {
			EnabledModules instance = entityManager.find(EnabledModules.class,
					id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
}
