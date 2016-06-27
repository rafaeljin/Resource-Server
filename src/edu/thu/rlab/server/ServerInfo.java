package edu.thu.rlab.server;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

public class ServerInfo {
	
	public final static boolean activated = true;
	
	public final static String mainServerIp = "127.0.0.1";//"166.111.227.77";
	
	public final static int serverPort = 9091;
	
	public final static String authenCode = "secret";
	
	public static boolean authenticated = false;
	
	public static int heartBeatForSync = 10000;
	
	public static String thisServerIp(){
		
		// Don't know why but this part returns .69.254.*.*
		/*InetAddress IP = null;
		try {
			IP = InetAddress.getLocalHost();
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//return IP.getHostAddress();*/
		
		// The last address from enumeration is the correct address.
		// Pay close attention may lead to future bug.
		Enumeration e = null;
		String s = "";
		try {
			e = NetworkInterface.getNetworkInterfaces();
		} catch (SocketException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		while(e.hasMoreElements())
		{
		    NetworkInterface n = (NetworkInterface) e.nextElement();
		    Enumeration ee = n.getInetAddresses();
		    while (ee.hasMoreElements())
		    {
		        InetAddress i = (InetAddress) ee.nextElement();
		        // to get the last one
		        s = i.getHostAddress(); // should check here 
		    }
		}
		return s;
		
	}
}
