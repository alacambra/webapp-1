package poolingpeople.persistance.neo4j.ingestor;

// Generated Feb 17, 2014 1:20:17 PM by Hibernate Tools 4.0.0

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

/**
 * Home object for domain model class CustomFields.
 * @see poolingpeople.persistance.neo4j.ingestor.CustomFields
 * @author Hibernate Tools
 */
@Stateless
public class CustomFieldsHome {

	private static final Log log = LogFactory.getLog(CustomFieldsHome.class);

	@PersistenceContext
	private EntityManager entityManager;

	public void persist(CustomFields transientInstance) {
		log.debug("persisting CustomFields instance");
		try {
			entityManager.persist(transientInstance);
			log.debug("persist successful");
		} catch (RuntimeException re) {
			log.error("persist failed", re);
			throw re;
		}
	}

	public void remove(CustomFields persistentInstance) {
		log.debug("removing CustomFields instance");
		try {
			entityManager.remove(persistentInstance);
			log.debug("remove successful");
		} catch (RuntimeException re) {
			log.error("remove failed", re);
			throw re;
		}
	}

	public CustomFields merge(CustomFields detachedInstance) {
		log.debug("merging CustomFields instance");
		try {
			CustomFields result = entityManager.merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public CustomFields findById(Integer id) {
		log.debug("getting CustomFields instance with id: " + id);
		try {
			CustomFields instance = entityManager.find(CustomFields.class, id);
			log.debug("get successful");
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
}
