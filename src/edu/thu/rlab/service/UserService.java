package edu.thu.rlab.service;

import java.io.File;

import com.alibaba.fastjson.JSONObject;

import edu.thu.rlab.pojo.User;

public interface UserService {
	public int create(User currentUser, User user);
	
	public int batchCreateStudent(User currentUser, File file);
	
	public int update(User user);
	
	public boolean modifyPassword(User user, String currentPassword, String newPassword);
	
	public JSONObject getProifle(User current, User toGet);

}
