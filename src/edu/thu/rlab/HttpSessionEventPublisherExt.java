package edu.thu.rlab;

import java.util.Date;

import javax.servlet.http.HttpSessionEvent;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.context.support.WebApplicationContextUtils;

import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.DeviceService;
import edu.thu.rlab.service.UserService;

public class HttpSessionEventPublisherExt extends HttpSessionEventPublisher {
	@Override
	public void sessionCreated(HttpSessionEvent event) {
		// TODO Auto-generated method stub
		super.sessionCreated(event);
	}

	//extend for calculate the user online time
	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		
		super.sessionDestroyed(event);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(null == auth) {
			return;
		}
		//user quits without timeout
		User user = (User)auth.getPrincipal();
		long current = (new Date()).getTime();
		long login = user.getLastLoginTime().getTime();
		user.setOnlineTime(user.getOnlineTime() + current - login);
		UserService userService = (UserService)WebApplicationContextUtils.getWebApplicationContext(
					event.getSession().getServletContext()).getBean(
					"userService");
		userService.update(user);
		

		DeviceService deviceService = (DeviceService)WebApplicationContextUtils.getWebApplicationContext(
				event.getSession().getServletContext()).getBean(
						"deviceService");
		deviceService.disconnect(user);
	}

}
