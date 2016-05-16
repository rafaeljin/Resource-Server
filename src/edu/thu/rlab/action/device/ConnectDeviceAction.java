package edu.thu.rlab.action.device;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.service.DeviceService;

public class ConnectDeviceAction extends BaseAction {
	
	private DeviceService deviceService;
	
	public void setDeviceService(DeviceService deviceService) {
		this.deviceService = deviceService;
	}

	@Override
	public String execute() throws Exception {
		success = true;
		errorCode = this.deviceService.connect(this.getCurrentUser());
		if(errorCode < 0){
			success = false;
		}
		return INPUT;
	}
}
