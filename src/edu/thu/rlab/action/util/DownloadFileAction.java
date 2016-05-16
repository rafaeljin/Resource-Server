package edu.thu.rlab.action.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import edu.thu.rlab.action.BaseAction;

public class DownloadFileAction extends BaseAction {

	private String fileName;
	
	private InputStream is;
	
	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	public InputStream getFile(){
		return is; 
	}

	@Override
	public String execute() throws Exception {
		is = new FileInputStream(new File(getRealPath(fileName)));
		return SUCCESS;
	}

}
