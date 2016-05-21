package edu.thu.rlab.server;
import java.util.List;

import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.pojo.CourseHasUser;
import edu.thu.rlab.pojo.Cpu;
import edu.thu.rlab.pojo.Database;
import edu.thu.rlab.pojo.Experiment;
import edu.thu.rlab.pojo.User;

public class ServerMessage implements java.io.Serializable{
	
	/* serialize version ID */
	private static final long serialVersionUID = 3326100847047137828L;

	private int type;
	
	public static final int RESOURCE_SERVER_AUTHEN = 0;
	
	private String authen_code;
	
	private Database database;
	
	public static final int RESOURCE_SERVER_UPDATE_COURSE = 1;
	
	private Course course = null;
	
	public static final int CLIENT_CONNECT = 2;
	
	public static final int RESOURCE_SERVER_AUTHEN_SUCCESS = 3;
	
	public static final int RESOURCE_SERVER_AUTHEN_FAILED = 4;
	
	public ServerMessage(int t,String code){
		type = t;
		authen_code = code;
	}
	
	public ServerMessage(int t,Course cs){
		type = t;
		course = cs;
	}
	
	public int getType(){
		return type;
	}
	
	public String getAuthenCode(){
		return authen_code;
	}
	
	public Course getCourse(){
		return course;
	}
	
	public Database getDatabase(){
		return database;
	}
	
	public void setDatabase(List<Course> cl,List<Experiment> el,List<User> ul,
			List<CourseHasUser> chul,List<Cpu> cpul){
		database.chasulist = chul;
        database.cpulist = cpul;
        database.experimentlist = el;
        database.userlist = ul;
        database.courselist = cl;
		return;
	}


}
