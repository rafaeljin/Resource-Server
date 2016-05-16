package edu.thu.rlab.service;

import com.alibaba.fastjson.JSONArray;

import edu.thu.rlab.pojo.DeviceCmd;
import edu.thu.rlab.pojo.User;

public interface DeviceService {
	
	public int connect(User user);
	
	public void disconnect(User user);
	
	public int executeByUser(User user, DeviceCmd deviceCmd);
	
	public int executeByAdmin(String deviceId, DeviceCmd deviceCmd);
	
	public JSONArray list();

}
