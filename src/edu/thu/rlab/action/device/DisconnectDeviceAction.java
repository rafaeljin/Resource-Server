package edu.thu.rlab.action.device;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.service.DeviceService;

public class DisconnectDeviceAction extends BaseAction {

	private DeviceService deviceService;
	
	public void setDeviceService(DeviceService deviceService) {
		this.deviceService = deviceService;
	}

	@Override
	public String execute() throws Exception {
		success = true;
		deviceService.disconnect(this.getCurrentUser());
		return SUCCESS;
	}
}
