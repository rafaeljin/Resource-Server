package edu.thu.rlab.action.device;

import com.alibaba.fastjson.JSONArray;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.service.DeviceService;

public class ListDeviceAction extends BaseAction {
	
	private DeviceService deviceService;

	private JSONArray devices;
	
	public void setDeviceService(DeviceService deviceService) {
		this.deviceService = deviceService;
	}

	public JSONArray getDevices() {
		return devices;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		success = false;
		this.devices = this.deviceService.list();
		success = true;
		return SUCCESS;
	}
}
