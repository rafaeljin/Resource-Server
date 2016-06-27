package edu.thu.rlab.server;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.List;

import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.pojo.CourseHasUser;
import edu.thu.rlab.pojo.Cpu;
import edu.thu.rlab.pojo.Database;
import edu.thu.rlab.pojo.Device;
import edu.thu.rlab.pojo.Experiment;
import edu.thu.rlab.pojo.User;

public class Messenger {
	
	public static boolean authen(){
		Socket s = null;
		try {
			// send authen code
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			MyMessage ms = new MyMessage(MyMessage.AUTHEN,ServerInfo.authenCode);
			ObjectOutputStream outStream = new ObjectOutputStream(s.getOutputStream());
			outStream.writeObject(ms);
			// get authen result
			ObjectInputStream inputStream = new ObjectInputStream(s.getInputStream());
	    	Boolean authen_res = (Boolean) inputStream.readObject();
	    	ServerInfo.authenticated = authen_res;
	    	// if authen success, send local database to main server
	    	if(authen_res){
	    		DBEditor dbeditor = new DBEditor("mydb","root","rlab");
	    		dbeditor.connect();
	    		Database database = new Database(dbeditor.readAllCourses(), dbeditor.readAllExperiments(),
	    				dbeditor.readAllUsers(),dbeditor.readAllCpus() ,dbeditor.readAllCHU() );
	    		outStream.writeObject(database);
	    	}
	    	outStream.close();
	    	s.close();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return true;
	}
	
	public static boolean add(Course course){
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			MyMessage ms = new MyMessage(MyMessage.ADD_COURSE,course);
			ObjectOutputStream outStream = new ObjectOutputStream(s.getOutputStream());
			outStream.writeObject(ms);
			//BufferedReader input = new BufferedReader(new InputStreamReader(s.getInputStream()));
			s.close();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		return true;
	} 
	
	public static boolean add(Experiment expr){
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			MyMessage ms = new MyMessage(MyMessage.ADD_EXPERIMENT,expr);
			ObjectOutputStream outStream = new ObjectOutputStream(s.getOutputStream());
			outStream.writeObject(ms);
			//BufferedReader input = new BufferedReader(new InputStreamReader(s.getInputStream()));
			s.close();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		return true;
	} 
	
	public static boolean add(User user){
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			MyMessage ms = new MyMessage(MyMessage.ADD_USER,user);
			ObjectOutputStream outStream = new ObjectOutputStream(s.getOutputStream());
			outStream.writeObject(ms);
			//BufferedReader input = new BufferedReader(new InputStreamReader(s.getInputStream()));
			s.close();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		return true;
	} 
	
	public static boolean add(Cpu cpu){
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			MyMessage ms = new MyMessage(MyMessage.ADD_CPU,cpu);
			ObjectOutputStream outStream = new ObjectOutputStream(s.getOutputStream());
			outStream.writeObject(ms);
			//BufferedReader input = new BufferedReader(new InputStreamReader(s.getInputStream()));
			s.close();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		return true;
	} 
	
	public static boolean add(CourseHasUser chu){
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			MyMessage ms = new MyMessage(MyMessage.ADD_COURSEHASUSER,chu);
			ObjectOutputStream outStream = new ObjectOutputStream(s.getOutputStream());
			outStream.writeObject(ms);
			//BufferedReader input = new BufferedReader(new InputStreamReader(s.getInputStream()));
			s.close();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
		return true;
	} 
	
	public static void returnRemoteDevice(User user,Device device)
	{
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			ObjectInputStream inputStream = new ObjectInputStream(s.getInputStream());
			ObjectOutputStream outputStream = new ObjectOutputStream(s.getOutputStream());
			MyMessage ms = new MyMessage(MyMessage.RETURN_DEVICE_TO_MAINSERVER,user,device);
			outputStream.writeObject(ms);
			// 
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return;
	} 
	
	public static Device requestRemoteDevice(User user)
	{
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			ObjectInputStream inputStream = new ObjectInputStream(s.getInputStream());
			ObjectOutputStream outputStream = new ObjectOutputStream(s.getOutputStream());
			MyMessage ms = new MyMessage(MyMessage.REQUEST_DEVICE_FROM_MAINSERVER,user);
			outputStream.writeObject(ms);
			String target = getFastest((List<String>) inputStream.readObject());
			outputStream.writeObject(target);
			return (Device) inputStream.readObject();
			// 
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	} 
	
	private static String getFastest(List<String> addrs){
		String target = null;
		int min_time = -1;
		for (String addr : addrs) {
			String line = null;
			try{
				Process pro = Runtime.getRuntime().exec("ping " + addr+" -l 1000 -n 4");
				BufferedReader buf = new BufferedReader(new InputStreamReader(pro.getInputStream()));
				while((line = buf.readLine()) != null){ 
					int position=0;
					if((position=line.indexOf("Average"))>=0){
						System.out.println(line);
						String string_time = line.substring(position+10,line.lastIndexOf("ms"));
						int time = Integer.parseInt(string_time);
						if(min_time == -1 || time < min_time){
							target = addr;
							min_time = time;
						}
					}
				}
			}catch(Exception ex){
	            System.out.println(ex.getMessage());
	        }
		}
		return target;
      }
}
