package edu.thu.rlab.action.user;

import org.apache.struts2.json.annotations.JSON;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.UserService;

public class UpdateProfileAction extends BaseAction {
	
	private User user;
	
	private UserService userService;

	public void setUser(User user) {
		this.user = user;
	}
	//add this annonation work very well ,fuck strange
	@JSON(serialize=false)
	public User getUser() {
		return user;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
		success = false;
		User current = this.getCurrentUser();
		if(!current.getId().equals(user.getId())){
			return SUCCESS;
		}
		current.setEmail(user.getEmail());
		current.setPhone(user.getPhone());
		this.userService.update(current);
		success = true;
		return SUCCESS;
	}
}
