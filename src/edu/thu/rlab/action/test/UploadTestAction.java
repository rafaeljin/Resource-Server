package edu.thu.rlab.action.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.struts2.json.annotations.JSON;

import edu.thu.rlab.action.BaseAction;

public class UploadTestAction extends BaseAction {
	
	private final static int BUFFER_SIZE = 1024;
	
	private File upload;

	private String uploadContentType;

	private String uploadFileName;
	
	private String directory;

	private String path;
	
	
	@JSON(serialize=false)
	public File getUpload() {
		return upload;
	}

	public void setUpload(File upload) {
		this.upload = upload;
	}
	@JSON(serialize=false)
	public String getUploadContentType() {
		return uploadContentType;
	}

	public void setUploadContentType(String uploadContentType) {
		this.uploadContentType = uploadContentType;
	}
	@JSON(serialize=false)
	public String getUploadFileName() {
		return uploadFileName;
	}

	public void setUploadFileName(String uploadFileName) {
		this.uploadFileName = uploadFileName;
	}
	@JSON(serialize=false)
	public String getDirectory() {
		return directory;
	}

	public void setDirectory(String directory) {
		this.directory = directory;
	}
	
	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}
	@Override
	public String execute() throws Exception {
		this.path = this.directory + this.getCurrentTime().getTime();
		this.copy(this.getUpload(), new File(getRealPath(path)));	
	//	this.deleteFile(path);
		this.success = true;
		return SUCCESS;
	}

	private void copy(File srcFile, File dstFile){
		FileInputStream fis = null;    
        FileOutputStream fos = null;    
        try {    
            fis = new FileInputStream(srcFile);  
            fos = new FileOutputStream(dstFile);    
            byte[] buffer = new byte[BUFFER_SIZE];    
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
