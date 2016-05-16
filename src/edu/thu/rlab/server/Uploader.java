package edu.thu.rlab.server;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.net.UnknownHostException;

import edu.thu.rlab.pojo.Course;

public class Uploader {
	
	public static boolean authen(){
		Socket s = null;
		try {
			s = new Socket(MainserverInfo.serverIp, MainserverInfo.serverPort);
			ServerMessage ms = new ServerMessage(0,MainserverInfo.authenCode);
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
		return false;
	}
	
	public static boolean upload(Course course){
		Socket s = null;
		try {
			s = new Socket(MainserverInfo.serverIp, MainserverInfo.serverPort);
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
