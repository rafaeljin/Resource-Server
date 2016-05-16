package edu.thu.rlab.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import edu.thu.rlab.dao.UserDAO;
import edu.thu.rlab.pojo.User;

public class UserDetailsServiceImpl implements UserDetailsService {

	private UserDAO userDAO;
	
	public UserDAO getUserDAO() {
		return userDAO;
	}

	public void setUserDAO(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@SuppressWarnings("unchecked")
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		if(null == username)
			return null;
		List<User> users = userDAO.findByUsername(username);
	
		if (users == null || users.size() == 0) {
			throw new UsernameNotFoundException("User Do Not Exist");
		}

		User user =(User)users.get(0);		
		Collection<GrantedAuthority> authorities = new HashSet();
		authorities.add(new SimpleGrantedAuthority(user.getUserRole()));
		user.setAuthorities(authorities);
		return user;
	}
}
