package edu.thu.rlab.action.user;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ActionContext;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.UserService;

public class LoginSuccessAction extends BaseAction {
	
	private UserService userService;
	
	public UserService getUserService() {
		return userService;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public String execute() throws Exception {
		User user = this.getCurrentUser();
		user.setDeviceState(User.DEVICESTATE.NULL);
		user.setLastLoginTime(getCurrentTime());
		user.setLastLoginIp(getIP());
		user.setLoginCount(user.getLoginCount() + 1);
		this.userService.update(user);
		String role = this.getUserRole();
		Map session = (Map)ActionContext.getContext().get("session");
		session.put("role", role);
		if(!"ROLE_ADMIN".equals(role)){
			JSONObject course = new JSONObject();
			course.put("username", user.getName());
			course.put("name", user.getCourse().getName());
			course.put("code", user.getCourse().getCode());
			course.put("year", user.getCourse().getYear());

			session.put("course", course.toJSONString());	
		}
		return SUCCESS;
	}

}
