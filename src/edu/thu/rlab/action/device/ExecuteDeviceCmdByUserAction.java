package edu.thu.rlab.action.device;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import edu.thu.rlab.Message;
import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.DeviceCmd;
import edu.thu.rlab.service.DeviceService;

public class ExecuteDeviceCmdByUserAction extends BaseAction {
	
	private DeviceCmd deviceCmd;
	
	private DeviceService deviceService;
	
	private String directory;
	
	public void setDeviceCmd(DeviceCmd deviceCmd) {
		this.deviceCmd = deviceCmd;
	}

	public DeviceCmd getDeviceCmd() {
		return deviceCmd;
	}
	
	public void setDeviceService(DeviceService deviceService) {
		this.deviceService = deviceService;
	}

	public void setDirectory(String directory) {
		this.directory = directory;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		success = true;
		if(null != deviceCmd.fileName) {
			deviceCmd.setFileName(this.getRealPath(deviceCmd.fileName));
		}
		errorCode = deviceService.executeByUser(getCurrentUser(), deviceCmd);
		if(errorCode != Message.SUCCESS) {
			success = false;
		}
		if(deviceCmd.returnFile){
			deviceCmd.fileName = directory + this.getCurrentUser().getId();
			this.deleteFile(deviceCmd.fileName);
			copy(new File(getRealPath(deviceCmd.fileName)));
			deviceCmd.setRam(null);
		}else{
			//cmd writeram..
			if(null != deviceCmd.fileName) {
				(new File(deviceCmd.fileName)).delete();
			}
		}
		return SUCCESS;
	}
	
	private void copy(File dstFile){
		InputStream fis = deviceCmd.is;    
        FileOutputStream fos = null;    
        try {    
            fos = new FileOutputStream(dstFile);    
            byte[] buffer = new byte[1024];    
            int len = 0;    
            while ((len = fis.read(buffer)) > 0) {    
                fos.write(buffer, 0, len);    
            }    
        } catch (Exception e) {    
            e.printStackTrace();    
        } finally {    
            if (null != fis) {    
                try {    
                    fis.close();    
                } catch (IOException e) {    
                    e.printStackTrace();    
                }    
            }    
            if (null != fos) {    
                try {    
                    fos.close();    
                } catch (IOException e) {    
                    e.printStackTrace();    
                }    
            }    
        } 
	}

}
