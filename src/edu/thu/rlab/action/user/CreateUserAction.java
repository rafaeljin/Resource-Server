package edu.thu.rlab.action.user;

import org.apache.struts2.json.annotations.JSON;

import edu.thu.rlab.action.BaseAction;
import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.UserService;

public class CreateUserAction extends BaseAction {
	
	private User user;
	
	private UserService userService;

	public void setUser(User user) {
		this.user = user;
	}
	//add this annonation work very well ,fuck strange
	@JSON(serialize=false)
	public User getUser(){
		return this.user;
	}

	public void setUserService(UserService userService) {
		this.userService = userService;
	}
	@Override
	public String execute() throws Exception {
		// TODO Auto-generated method stub
	//	System.out.println("Username:" + user.getUsername());
	//	System.out.println("Password:" + user.getPassword());
	//	System.out.println("Email:" + user.getEmail());
	//	System.out.println("Phone:" + user.getPhone());
	//	System.out.println("Name:" + user.getName());
	//	System.out.println("Id:" + user.getCourse().getId());
		this.userService.create(this.getCurrentUser(), user);
		success = true;
		return INPUT;
	}

}
