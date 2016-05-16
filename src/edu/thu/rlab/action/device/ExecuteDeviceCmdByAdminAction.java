package edu.thu.rlab.action.device;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.DeviceCmd;
import edu.thu.rlab.service.DeviceService;

public class ExecuteDeviceCmdByAdminAction extends BaseAction {
	
	private String deviceId;
	
	private DeviceCmd deviceCmd;
	
	private DeviceService deviceService;

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public DeviceCmd getDeviceCmd() {
		return deviceCmd;
	}

	public void setDeviceCmd(DeviceCmd deviceCmd) {
		this.deviceCmd = deviceCmd;
	}

	public void setDeviceService(DeviceService deviceService) {
		this.deviceService = deviceService;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		success = true;
		if(null != deviceCmd.fileName) {
			deviceCmd.setFileName(this.getRealPath(deviceCmd.fileName));
		}
		deviceService.executeByAdmin(deviceId, deviceCmd);
		return SUCCESS;
	}
	
	
}
