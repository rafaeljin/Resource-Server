package edu.thu.rlab.usb;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;

import edu.thu.rlab.dao.DeviceDAO;

public class DeviceServer extends Thread {

	private static final int MaxDeviceCount = 1024;

	private int serverPort;

	private DeviceDAO deviceDAO;

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
		this.start();
	}

	@Override
	public void run() {
		ServerSocket server = null;
		Socket client = null;
		InetAddress clientIP = null;
		byte[] deviceBuffer = new byte[MaxDeviceCount];
		int deviceCount;
		try {
			server = new ServerSocket(this.getServerPort());
		} catch (Exception e) {
			System.out.println("Init Device Server wrong");
			e.printStackTrace();
			return;
		}

		while (true) {
			try {
				client = server.accept();

				clientIP = client.getInetAddress();
				BufferedInputStream in = new BufferedInputStream(client
						.getInputStream());
				deviceCount = in.read(deviceBuffer);
				client.close();
				client = null;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				if (client != null) {
					try {
						client.close();
					} catch (IOException ce) {
						ce.printStackTrace();
					}
				}
				e.printStackTrace();
				continue;
			}
			deviceDAO.updateDevicePool(clientIP.getHostAddress(), deviceBuffer,
					deviceCount);
		}

	}
}
