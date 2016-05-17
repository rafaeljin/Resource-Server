package edu.thu.rlab.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import edu.thu.rlab.pojo.User;

public class UserDetailsImpl extends User implements UserDetails {
	
	private Collection<? extends GrantedAuthority> authorities;
	
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}
	
	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}

	public boolean isAccountNonExpired() {
		return this.isEnabled();
	}

	public boolean isAccountNonLocked() {
		return this.isEnabled();
	}

	public boolean isCredentialsNonExpired() {
		return this.isEnabled();
	}

	public boolean isEnabled() {
		return true;
	}
}
