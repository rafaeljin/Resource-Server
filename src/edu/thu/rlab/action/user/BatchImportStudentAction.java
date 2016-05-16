package edu.thu.rlab.action.user;

import java.io.File;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.service.UserService;

public class BatchImportStudentAction extends BaseAction {
	
	private String path;
	
	private UserService userService;

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}


	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public String execute() throws Exception {
		File file = this.isFileExists(path);
		if(null != file){
			userService.batchCreateStudent(getCurrentUser(), file);
			file.delete();
		} 
		success = true;
		return INPUT;
	}

}
