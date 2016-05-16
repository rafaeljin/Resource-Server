package edu.thu.rlab.dao;

import java.sql.Timestamp;
import java.util.List;
import java.util.Set;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.LockMode;
import org.springframework.context.ApplicationContext;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import edu.thu.rlab.pojo.User;

/**
 * A data access object (DAO) providing persistence and search support for User
 * entities. Transaction control of the save(), update() and delete() operations
 * can directly support Spring container-managed transactions or they can be
 * augmented to handle user-managed Spring transactions. Each of these methods
 * provides additional information for how to configure it for the desired type
 * of transaction control.
 * 
 * @see edu.thu.rlab.pojo.User
 * @author MyEclipse Persistence Tools
 */

public class UserDAO extends HibernateDaoSupport {
	private static final Log log = LogFactory.getLog(UserDAO.class);
	// property constants
	public static final String USERNAME = "username";
	public static final String PASSWORD = "password";
	public static final String ENABLED = "enabled";
	public static final String USER_ROLE = "userRole";
	public static final String SCHOOL_NO = "schoolNo";
	public static final String NAME = "name";
	public static final String CLAZZ_NAME = "clazzName";
	public static final String EMAIL = "email";
	public static final String PHONE = "phone";
	public static final String LAST_LOGIN_IP = "lastLoginIp";
	public static final String LOGIN_COUNT = "loginCount";
	public static final String ONLINE_TIME = "onlineTime";

	protected void initDao() {
		// do nothing
	}

	public void save(User transientInstance) {
		log.debug("saving User instance");
		try {
			getHibernateTemplate().save(transientInstance);
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(User persistentInstance) {
		log.debug("deleting User instance");
		try {
			getHibernateTemplate().delete(persistentInstance);
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public User findById(java.lang.String id) {
		log.debug("getting User instance with id: " + id);
		try {
			User instance = (User) getHibernateTemplate().get(
					"edu.thu.rlab.pojo.User", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(User instance) {
		log.debug("finding User instance by example");
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

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding User instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from User as model where model."
					+ propertyName + "= ?";
			return getHibernateTemplate().find(queryString, value);
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}

	public List findByUsername(Object username) {
		return findByProperty(USERNAME, username);
	}

	public List findByPassword(Object password) {
		return findByProperty(PASSWORD, password);
	}

	public List findByEnabled(Object enabled) {
		return findByProperty(ENABLED, enabled);
	}

	public List findByUserRole(Object userRole) {
		return findByProperty(USER_ROLE, userRole);
	}

	public List findBySchoolNo(Object schoolNo) {
		return findByProperty(SCHOOL_NO, schoolNo);
	}

	public List findByName(Object name) {
		return findByProperty(NAME, name);
	}

	public List findByClazzName(Object clazzName) {
		return findByProperty(CLAZZ_NAME, clazzName);
	}

	public List findByEmail(Object email) {
		return findByProperty(EMAIL, email);
	}

	public List findByPhone(Object phone) {
		return findByProperty(PHONE, phone);
	}

	public List findByLastLoginIp(Object lastLoginIp) {
		return findByProperty(LAST_LOGIN_IP, lastLoginIp);
	}

	public List findByLoginCount(Object loginCount) {
		return findByProperty(LOGIN_COUNT, loginCount);
	}

	public List findByOnlineTime(Object onlineTime) {
		return findByProperty(ONLINE_TIME, onlineTime);
	}

	public List findAll() {
		log.debug("finding all User instances");
		try {
			String queryString = "from User";
			return getHibernateTemplate().find(queryString);
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public User merge(User detachedInstance) {
		log.debug("merging User instance");
		try {
			User result = (User) getHibernateTemplate().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(User instance) {
		log.debug("attaching dirty User instance");
		try {
			getHibernateTemplate().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(User instance) {
		log.debug("attaching clean User instance");
		try {
			getHibernateTemplate().lock(instance, LockMode.NONE);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public static UserDAO getFromApplicationContext(ApplicationContext ctx) {
		return (UserDAO) ctx.getBean("UserDAO");
	}
}