package edu.thu.rlab.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import edu.thu.rlab.pojo.Cpu;

/**
 * A data access object (DAO) providing persistence and search support for Cpu
 * entities. Transaction control of the save(), update() and delete() operations
 * can directly support Spring container-managed transactions or they can be
 * augmented to handle user-managed Spring transactions. Each of these methods
 * provides additional information for how to configure it for the desired type
 * of transaction control.
 * 
 * @see edu.thu.rlab.pojo.Cpu
 * @author MyEclipse Persistence Tools
 */

public class CpuDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory.getLog(CpuDAO.class);

	public void save(Cpu transientInstance) {
		log.debug("saving Cpu instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Cpu persistentInstance) {
		log.debug("deleting Cpu instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Cpu findById(java.lang.String id) {
		log.debug("getting Cpu instance with id: " + id);
		try {
			Cpu instance = (Cpu) getHibernateTemplate().get("edu.thu.rlab.pojo.Cpu", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Cpu instance) {
		log.debug("finding Cpu instance by example");
		try {
			List results = getHibernateTemplate().findByExample(instance);
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}
	public List findByCriteria(DetachedCriteria criteria) {
		log.debug("finding cpu instance by criteria");
		try {
			List results = getHibernateTemplate().findByCriteria(criteria);
			log.debug("find by criteria successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by criteria failed", re);
			throw re;
		}
	}
	public List findByProperty(String propertyName, Object value) {
		log.debug("finding Cpu instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Cpu as model where model."
				+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findAll() {
		log.debug("finding all Cpu instances");
		try {
			String queryString = "from Cpu";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Cpu merge(Cpu detachedInstance) {
		log.debug("merging Cpu instance");
		try {
			Cpu result = getHibernateTemplate().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Cpu instance) {
		log.debug("attaching dirty Cpu instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Cpu instance) {
		log.debug("attaching clean Cpu instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}
	public static CpuDAO getFromApplicationContext(ApplicationContext ctx) {
		return (CpuDAO) ctx.getBean("CpuDAO");
	}
}