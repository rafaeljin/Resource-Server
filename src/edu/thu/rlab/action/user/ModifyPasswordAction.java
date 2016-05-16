package edu.thu.rlab.action.user;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.service.UserService;

public class ModifyPasswordAction extends BaseAction {
	private String currentPassword;
	
	private String newPassword;
	
	private UserService userService;

	public String getCurrentPassword() {
		return currentPassword;
	}

	public void setCurrentPassword(String currentPassword) {
		this.currentPassword = currentPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		success = this.userService.modifyPassword(this.getCurrentUser(), currentPassword, newPassword);
		return INPUT;
	}
}
