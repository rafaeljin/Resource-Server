package edu.thu.rlab.server;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.net.UnknownHostException;

import edu.thu.rlab.pojo.Course;
import edu.thu.rlab.pojo.Database;

public class Messenger {
	
	public static boolean authen(){
		Socket s = null;
		try {
			// send authen code
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			ServerMessage ms = new ServerMessage(0,ServerInfo.authenCode);
			ObjectOutputStream outStream = new ObjectOutputStream(s.getOutputStream());
			outStream.writeObject(ms);
			// get authen result
			ObjectInputStream inputStream = new ObjectInputStream(s.getInputStream());
	    	Boolean authen_res = (Boolean) inputStream.readObject();
	    	ServerInfo.authenticated = authen_res;
	    	System.out.println("huehuehue " + authen_res);
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
	
	public static boolean upload(Course course){
		Socket s = null;
		try {
			s = new Socket(ServerInfo.mainServerIp, ServerInfo.serverPort);
			ServerMessage ms = new ServerMessage(1,course);
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
	
	
	/*boolean upLoad(Teacher teacher){
		
	}*/
}
