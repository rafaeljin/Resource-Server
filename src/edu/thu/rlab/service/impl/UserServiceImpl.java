package edu.thu.rlab.service.impl;

import java.io.File;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.crypto.password.StandardPasswordEncoder;

import com.alibaba.fastjson.JSONObject;

import edu.thu.rlab.dao.UserDAO;
import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.UserService;
import edu.thu.rlab.util.ExcelUtil;

public class UserServiceImpl implements UserService {

	private UserDAO userDAO;

	private StandardPasswordEncoder encoder;

	public UserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	public StandardPasswordEncoder getEncoder() {
		return encoder;
	}

	public void setEncoder(StandardPasswordEncoder encoder) {
		this.encoder = encoder;
	}

	public void init() {
		List list = userDAO.findByUsername("admin");
		if (list.size() == 0) {
			User admin = new User();
			admin.setUsername("admin");
			admin.setPassword(encoder.encode("admin"));
			admin.setName("admin");
			admin.setUserRole("ROLE_ADMIN");
			admin.setEnabled(true);
			admin.setLoginCount(0);
			admin.setOnlineTime((long) 0);
			this.userDAO.save(admin);
		}
	}

	public int create(User currentUser, User user) {
		String role = currentUser.getUserRole();
		Set<Course> courses = new HashSet<Course>();
		if("ROLE_ADMIN".equals(role)){
			user.setUserRole("ROLE_TEACHER");
			courses.add(user.getCourse());
			user.setCourses(courses);
		}else if("ROLE_TEACHER".equals(role)){
			user.setUserRole("ROLE_STUDENT");
			user.setCourse(currentUser.getCourse());
			courses.add(user.getCourse());
			user.setCourses(courses);
		}else{
			return -1;
		}
		user.setEnabled(true);
		user.setPassword(encoder.encode(user.getPassword()));
		user.setLoginCount(0);
		user.setOnlineTime((long) 0);
		this.userDAO.save(user);
		return 0;
	}

	public int batchCreateStudent(User currentUser, File file) {

		String[][] content = ExcelUtil.readContent(file);
		if (null == content) {
			return -1;
		}
		int row = content.length;
		int col = content[0].length;
		
		for (int i = 1; i < row; i++) {
			User user = new User();
			for (int j = 0; j < col; j++) {
				if ("学 号".equals(content[0][j])) {
					user.setSchoolNo(content[i][j]);
				}
				if ("班 级".equals(content[0][j])) {
					user.setClazzName(content[i][j]);

				} 
				if ("姓 名".equals(content[0][j])) {
					user.setName(content[i][j]);

				} 
				if ("电子邮件".equals(content[0][j])) {
					user.setEmail(content[i][j]);

				} 
				if ("电 话".equals(content[0][j])) {
					user.setPhone(content[i][j]);
				} 
			}
			user.setUsername(user.getSchoolNo());
			user.setPassword(user.getSchoolNo());
			this.create(currentUser, user);
		}
		return 0;
	}

	public int update(User user) {
		this.userDAO.attachDirty(user);
		return 0;
	}

	public boolean modifyPassword(User user, String currentPassword,
			String newPassword) {
		if (!encoder.matches(currentPassword, user.getPassword())) {
			return false;
		}
		user.setPassword(encoder.encode(newPassword));
		this.update(user);
		return true;
	}

	public JSONObject getProifle(User current, User toGet) {
		// TODO Auto-generated method stub
		JSONObject ret = new JSONObject();
		User toRet  = null;
		if(toGet.getId().equals("") || current.getId().equals(toGet.getId())){
			toRet = current;
		}else {
			//TODO
			if(current.getUserRole().equals("ROLE_TEACHER")){
				toRet = this.userDAO.findById(toGet.getId());
			//	ret.put(key, value)
			}
		}
		if(toRet == null) {
			return null;
		}
		ret.put("id", toRet.getId());
		ret.put("userRole", toRet.getUserRole());
		ret.put("name", toRet.getName());
		ret.put("email", toRet.getEmail());
		ret.put("phone", toRet.getPhone());
		ret.put("createTime", toRet.getCreateTime());
		ret.put("loginCount", toRet.getLoginCount());
		ret.put("onlineTime", toRet.getOnlineTime());
		ret.put("lastLoginTime", toRet.getLastLoginTime());
		ret.put("lastLoginIp", toRet.getLastLoginIp());
		if(toRet.getUserRole().equals("ROLE_STUDENT")){
			ret.put("schoolNo", toRet.getSchoolNo());
			ret.put("clazzName", toRet.getClazzName());
		}
		return ret;
	}
	
	

}
