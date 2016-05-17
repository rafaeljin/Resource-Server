package edu.thu.rlab.action;

import java.io.File;
import java.sql.Timestamp;
import java.util.Date;

import org.apache.struts2.ServletActionContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import com.opensymphony.xwork2.ActionSupport;

import edu.thu.rlab.pojo.User;

public abstract class BaseAction extends ActionSupport {
	protected boolean success;
	
	protected int errorCode;
	
	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	private Authentication getAuth(){
		return SecurityContextHolder.getContext().getAuthentication();
	}

	protected User getCurrentUser(){
		Authentication auth = this.getAuth();
		if(auth == null) {
			return null;
		}
		return (User)auth.getPrincipal();
	}
	protected String getUserRole(){
		Authentication auth = this.getAuth();
		if(auth == null) {
			return null;
		}
		return auth.getAuthorities().toArray()[0].toString();
	}
	protected String getIP(){
		Authentication auth = this.getAuth();
		if(auth == null) {
			return null;
		}
		WebAuthenticationDetails details = (WebAuthenticationDetails) this.getAuth().getDetails();
		return details.getRemoteAddress();
	}
	protected Timestamp getCurrentTime(){
		return new Timestamp((new Date()).getTime());
	}
	protected String getRealPath(String path){
		return ServletActionContext.getServletContext().getRealPath(path);
	}
	protected File isFileExists(String path){
		File file = new File(this.getRealPath(path));
		if(file.exists()) {
			return file;
		}
		return null;
	}
	protected void deleteFile(String path){
		File file = new File(this.getRealPath(path));
		file.delete();
	}
}
