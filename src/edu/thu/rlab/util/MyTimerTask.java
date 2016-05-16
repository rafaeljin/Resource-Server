package edu.thu.rlab.util;

import java.lang.reflect.InvocationTargetException;

public class MyTimerTask extends java.util.TimerTask {

	private static final String TRIGGERMETHOD = "triggerTimeout";
	
	private Object object;
	
	
	public MyTimerTask(Object object) {
		super();
		this.object = object;
	}

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}

	@Override
	public void run() {
		// TODO Auto-generated method stub
		try {
			object.getClass().getMethod(TRIGGERMETHOD, new Class[]{}).invoke(object,  new Object[]{});
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}
