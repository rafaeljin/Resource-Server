package edu.thu.rlab.server;

import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

import edu.thu.rlab.dao.DeviceDAO;
import edu.thu.rlab.pojo.Device;
import edu.thu.rlab.pojo.User;

public class ListenerToMainServer extends Thread {

	private static final int MaxDeviceCount = 1024;

	private int serverPort;

	private DeviceDAO deviceDAO;
	
	private Map<String, Device> userDeviceMap = new HashMap<String, Device>();

	public int getServerPort() {
		return serverPort;
	}

	public void setServerPort(int serverPort) {
		this.serverPort = serverPort;
	}

	public DeviceDAO getDeviceDAO() {
		return deviceDAO;
	}

	public void setDeviceDAO(DeviceDAO deviceDAO) {
		this.deviceDAO = deviceDAO;
	}

	public void init() {
		if(ServerInfo.activated) {
			this.start();
		}
	}

	@Override
	public void run() {
		
		ServerSocket localSocket = null;
		Socket inboundSocket = null;
		InetAddress inboundIP = null;
		byte[] deviceBuffer = new byte[MaxDeviceCount];
		int deviceCount;
		
		// init local socket
		try {
			localSocket = new ServerSocket(this.getServerPort());
		} catch (Exception e) {
			System.out.println("Failed to initialize Listener to Mainserver.");
			e.printStackTrace();
			return;
		}

		// main 
		while (true) {
			try {
				inboundSocket = localSocket.accept();
				inboundIP = inboundSocket.getInetAddress();
				if(!inboundIP.equals(ServerInfo.mainServerIp)) {
					continue;
				}
				
				ObjectInputStream inputStream = new ObjectInputStream(inboundSocket.getInputStream());
		    	ObjectOutputStream outStream = new ObjectOutputStream(inboundSocket.getOutputStream());
		    	
		    	// get message
		        MyMessage ms = null;
				try {
					ms = (MyMessage) inputStream.readObject();
				} catch (ClassNotFoundException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				User user = null;
				Device device = null;
		        switch(ms.getType()){
		        	case MyMessage.REQUEST_DEVICE_FROM_TARGET_RESOURCESERVER:
		        		user = ms.getUser();
		        		device = this.deviceDAO.allocate(user);
		        		userDeviceMap.put(user.getId(), device);
		        		outStream.writeObject(device);
		        		break;
		        	case MyMessage.RETURN_DEVICE_TO_TARGET_RESOURCESERVER:
		        		user = ms.getUser();
		        		device = userDeviceMap.remove(user.getId());
		        		this.deviceDAO.free(device);
		        	default:
		        		break;
		        }
				inboundSocket.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				if (inboundSocket != null) {
					try {
						inboundSocket.close();
					} catch (IOException ce) {
						ce.printStackTrace();
					}
				}
				e.printStackTrace();
				continue;
			}
		}

	}
}
