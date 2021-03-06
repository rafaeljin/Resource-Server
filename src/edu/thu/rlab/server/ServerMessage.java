package edu.thu.rlab.server;
import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.pojo.CourseHasUser;
import edu.thu.rlab.pojo.Cpu;
import edu.thu.rlab.pojo.Experiment;
import edu.thu.rlab.pojo.User;

public class MyMessage implements java.io.Serializable{
	
	/* serialize version ID */
	private static final long serialVersionUID = 3326100847047137828L;

	private int type;
	
	public static final int AUTHEN = 0;
	
	private String authen_code;
	
	public static final int ADD_COURSE = 1;
	
	private Course course = null;
	
	public static final int ADD_USER = 2;
	
	private User user = null;
	
	public static final int ADD_EXPERIMENT = 3;
	
	private Experiment expr = null;
	
	public static final int ADD_CPU = 4;
	
	private Cpu cpu = null;
	
	public static final int ADD_COURSEHASUSER = 5;
	
	private CourseHasUser coursehasuser = null;
		
	public static final int CLIENT_CONNECT = 6;
	
	
	public MyMessage(int t,String code)
	{
		type = t;
		authen_code = code;
	}
	
	public MyMessage(int t,Experiment e)
	{
		type = t;
		expr = e;
	}
	
	public MyMessage(int t,User u)
	{
		type = t;
		user = u;
	}
	
	public MyMessage(int t,Cpu c)
	{
		type = t;
		cpu = c;
	}
	
	public MyMessage(int t,CourseHasUser ch)
	{
		type = t;
		coursehasuser = ch;
	}
	
	public MyMessage(int t,Course cs)
	{
		type = t;
		course = cs;
	}
	
	public int getType()
	{
		return type;
	}
	
	public String getAuthenCode()
	{
		return authen_code;
	}
	
	public Course getExperiment()
	{
		return experiment;
	}
	
	public Course getCpu()
	{
		return cpu;
	}
	
	public Course getUser()
	{
		return user;
	}
	
	public Course getCourse()
	{
		return course;
	}
	
	public Course getCourseHasUser()
	{
		return coursehasuser;
	}

}
