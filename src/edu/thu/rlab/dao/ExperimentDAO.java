package edu.thu.rlab.dao;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.hibernate.criterion.DetachedCriteria;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import edu.thu.rlab.pojo.Experiment;

/**
 * A data access object (DAO) providing persistence and search support for
 * Experiment entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see edu.thu.rlab.pojo.Experiment
 * @author MyEclipse Persistence Tools
 */

public class ExperimentDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory.getLog(ExperimentDAO.class);
	// property constants
	public static final String NAME = "name";
	public static final String OP_TIME = "opTime";
	public static final String OP_TIMES = "opTimes";
	public static final String LAST_SUBMIT_URL = "lastSubmitUrl";
	public static final String DONE = "done";
	public static final String SRC_URL = "srcUrl";
	public static final String GRADE = "grade";
	public static final String REMARK = "remark";

	@Override
	protected void initDao() {
		// do nothing
	}

	public void save(Experiment transientInstance) {
		log.debug("saving Experiment instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Experiment persistentInstance) {
		log.debug("deleting Experiment instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Experiment findById(java.lang.String id) {
		log.debug("getting Experiment instance with id: " + id);
		try {
			Experiment instance = (Experiment) getHibernateTemplate().get(
					"edu.thu.rlab.pojo.Experiment", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Experiment instance) {
		log.debug("finding Experiment instance by example");
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
		log.debug("finding Experiment instance by criteria");
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
		log.debug("finding Experiment instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Experiment as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByName(Object name) {
		return findByProperty(NAME, name);
	}

	public List findByOpTime(Object opTime) {
		return findByProperty(OP_TIME, opTime);
	}

	public List findByOpTimes(Object opTimes) {
		return findByProperty(OP_TIMES, opTimes);
	}

	public List findByLastSubmitUrl(Object lastSubmitUrl) {
		return findByProperty(LAST_SUBMIT_URL, lastSubmitUrl);
	}

	public List findByDone(Object done) {
		return findByProperty(DONE, done);
	}

	public List findBySrcUrl(Object srcUrl) {
		return findByProperty(SRC_URL, srcUrl);
	}

	public List findByGrade(Object grade) {
		return findByProperty(GRADE, grade);
	}

	public List findByRemark(Object remark) {
		return findByProperty(REMARK, remark);
	}

	public List findAll() {
		log.debug("finding all Experiment instances");
		try {
			String queryString = "from Experiment";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Experiment merge(Experiment detachedInstance) {
		log.debug("merging Experiment instance");
		try {
			Experiment result = getHibernateTemplate().merge(
					detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Experiment instance) {
		log.debug("attaching dirty Experiment instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Experiment instance) {
		log.debug("attaching clean Experiment instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static ExperimentDAO getFromApplicationContext(ApplicationContext ctx) {
		return (ExperimentDAO) ctx.getBean("ExperimentDAO");
	}
}