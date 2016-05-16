package edu.thu.rlab.service.impl;

import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;

import com.alibaba.fastjson.JSONArray;

import edu.thu.rlab.Message;
import edu.thu.rlab.dao.DeviceDAO;
import edu.thu.rlab.pojo.Device;
import edu.thu.rlab.pojo.DeviceCmd;
import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.DeviceService;

public class DeviceServiceImpl extends TimerTask implements DeviceService {

	private long userTimeoutTime;

	private long deleteTimeoutUserPeriod;

	private Timer timer;   //delete timeout user

	private DeviceDAO deviceDAO;

	private Map<String, Device> userDeviceMap = new HashMap<String, Device>();

	private byte[] lock = new byte[0]; // for synchronize

	public void setUserTimeoutTime(long userTimeoutTime) {
		this.userTimeoutTime = userTimeoutTime;
	}

	public void setDeleteTimeoutUserPeriod(long deleteTimeoutUserPeriod) {
		this.deleteTimeoutUserPeriod = deleteTimeoutUserPeriod;
	}

	public void setDeviceDAO(DeviceDAO deviceDAO) {
		this.deviceDAO = deviceDAO;
	}

	public void init() {
		timer = new Timer();
		timer.schedule(this, 0, deleteTimeoutUserPeriod);
	}

	public JSONArray list() {
		return this.deviceDAO.findAll();
	}
	public int connect(User user) {
		
		Device device; 
		//if clicking connect is too fast, two more devices will be allocated to the same user
		if(User.DEVICESTATE.APPLYING.equals(user.getDeviceState())){
			return Message.APPLYING;
		}
		user.setDeviceState(User.DEVICESTATE.APPLYING);
		
		// first check if existed
		if (userDeviceMap.containsKey(user.getId())) {
			user.setDeviceState(User.DEVICESTATE.USEING);  //relogin without disconnect
			return Message.SUCCESS;
		}

		device = this.deviceDAO.allocate(user);
		if (null == device) {
			user.setDeviceState(User.DEVICESTATE.NULL);
			return Message.NoAvailableDevice;
		}
		device.userInit();
		user.setDeviceState(User.DEVICESTATE.USEING);
		
		synchronized (lock) {
			userDeviceMap.put(user.getId(), device);
		}	
		return Message.SUCCESS;
	}


	public void disconnect(User user) {
		// first check if existed
		if (!userDeviceMap.containsKey(user.getId())) {
			return;
		}
		Device device;
		synchronized (lock) {
			device = userDeviceMap.remove(user.getId());
		}
		deviceDAO.free(device);
		user.setDeviceState(User.DEVICESTATE.NULL);
		
	}

	public int executeByUser(User user, DeviceCmd deviceCmd) {
		if (User.DEVICESTATE.TIMEOUT.equals(user.getDeviceState())) {
			return Message.DeviceTimeout;
		}
		Device device = userDeviceMap.get(user.getId());
		if (null == device) {
			return Message.IllegalOperation;
		}
		synchronized (lock) {
			deviceDAO.updateLastOperationTime(device);
		}
		deviceCmd.execute(device);
		return Message.SUCCESS;
	}
	public int executeByAdmin(String deviceId, DeviceCmd deviceCmd){
		
		deviceDAO.execute(deviceId, deviceCmd);
		
		return Message.SUCCESS;
	}
	
	@Override
	public void run() {
		// delete timeout user
		synchronized (lock) {
			User user;
			Device device;
			Collection<Device> devices = this.userDeviceMap.values();
			Iterator it = devices.iterator();
			Set<User> toDelete = new HashSet(0);
			while (it.hasNext()) {
				device = (Device) it.next();
				long l1 = System.currentTimeMillis();
				long l2 = device.getLastOpertaionTime();
				long l3 = userTimeoutTime;
				if((System.currentTimeMillis() - device.getLastOpertaionTime()) >  userTimeoutTime){
					user = device.getUser();
					user.setDeviceState(User.DEVICESTATE.TIMEOUT);
					toDelete.add(user);
				}
			}
			it = toDelete.iterator();
			while (it.hasNext()) {
				user = (User)it.next();
				device = userDeviceMap.remove(user.getId());
				deviceDAO.free(device);
			}
		}
	}

}
