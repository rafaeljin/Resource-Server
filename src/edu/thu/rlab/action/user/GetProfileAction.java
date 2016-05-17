package edu.thu.rlab.action.user;

import com.alibaba.fastjson.JSONObject;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.UserService;

public class GetProfileAction extends BaseAction {

	private User toGet;
	
	private JSONObject user;
	
	private UserService userService;

	public JSONObject getUser() {
		return user;
	}

	public void setToGet(User toGet) {
		this.toGet = toGet;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		success = true;
		user = this.userService.getProifle(getCurrentUser(), toGet);
		if(user == null){
			success = false;
		}
		return SUCCESS;
	}
}
