package edu.thu.rlab.service.impl;

import java.util.Iterator;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import edu.thu.rlab.Message;
import edu.thu.rlab.dao.CpuDAO;
import edu.thu.rlab.dao.ExperimentDAO;
import edu.thu.rlab.pojo.Cpu;
import edu.thu.rlab.pojo.DeviceCmd;
import edu.thu.rlab.pojo.Experiment;
import edu.thu.rlab.pojo.User;
import edu.thu.rlab.service.DeviceService;
import edu.thu.rlab.service.ExperimentService;

public class ExperimentServiceImpl implements ExperimentService {

	private ExperimentDAO experimentDAO;
	
	private CpuDAO cpuDAO;
	

	public ExperimentDAO getExperimentDAO() {
		return experimentDAO;
	}

	public void setExperimentDAO(ExperimentDAO experimentDAO) {
		this.experimentDAO = experimentDAO;
	}

	public void setCpuDAO(CpuDAO cpuDAO) {
		this.cpuDAO = cpuDAO;
	}

	public CpuDAO getCpuDAO() {
		return cpuDAO;
	}

	public String select(User user, Experiment experiment) {
	
		Experiment current = user.getExperiment();
		String oldPath = null;
		String newPath = experiment.getLastSubmitPath();

		if(user.getUserRole().equals("ROLE_TEACHER")){
			if(current != null){
				oldPath = current.getLastSubmitPath();
				current.setLastSubmitPath(newPath);
			}else{
				user.setExperiment(experiment);
			}
			return oldPath;
		}	
		//for student
		if (current != null && current.getName().equals(experiment.getName())) {
			oldPath = current.getLastSubmitPath();
			current.setLastSubmitPath(newPath);
			current.setSubmitTimes(current.getSubmitTimes() + 1);
			experimentDAO.attachDirty(current);
			return oldPath;
		}
		if (current != null) {
			experimentDAO.attachDirty(current);
		}

		DetachedCriteria criteria = DetachedCriteria .forClass(Experiment.class);
		criteria.add(Restrictions.eq("user", user));
		criteria.add(Restrictions.eq("course", user.getCourse()));
		criteria.add(Restrictions.eq("name", experiment.getName()));
		
		List list = experimentDAO.findByCriteria(criteria);
		if (list.size() == 0) {
			// first experiment
			current = new Experiment();
			current.setName(experiment.getName());
			current.setUser(user);
			current.setCourse(user.getCourse());
			current.setLastSubmitPath(newPath);
			current.setOpTime((long) 0);
			current.setOpTimes(0);
			current.setSubmitTimes(1);
			current.setDone(false);
			experimentDAO.save(current);
		} else {
			// in database ,user login and first experiment
			current = (Experiment) list.get(0);
			oldPath = current.getLastSubmitPath();
			current.setLastSubmitPath(newPath);
			current.setSubmitTimes(current.getSubmitTimes() + 1);
			experimentDAO.attachDirty(current);
		}
		user.setExperiment(current);
		return oldPath;
	}

	public JSONArray list(User current) {
		Experiment e;
		// e.setDone(true);
		DetachedCriteria criteria = DetachedCriteria .forClass(Experiment.class);
		criteria.add(Restrictions.eq("course", current.getCourse()));
		if (current.getUserRole().equals("ROLE_STUDENT")) {
			criteria.add(Restrictions.eq("user", current));
		}
		
		Iterator it = this.experimentDAO.findByCriteria(criteria).iterator();
		JSONArray experiments = new JSONArray();
		while (it.hasNext()) {
			e = (Experiment) it.next();
			JSONObject eObj = new JSONObject();
			eObj.put("id", e.getId());
			eObj.put("name", e.getName());
			eObj.put("userId", e.getUser().getId());
			eObj.put("schoolNo", e.getUser().getSchoolNo());
			eObj.put("username", e.getUser().getName());
			eObj.put("opTimes", e.getOpTimes());
			eObj.put("submitTimes", e.getSubmitTimes());
			eObj.put("lastSubmitPath", e.getLastSubmitPath());
			eObj.put("doneTime", e.getDoneTime());
			eObj.put("grade", e.getGrade());
			eObj.put("remark", e.getRemark());
			experiments.add(eObj);
		}
		return experiments;
	}

	public void judgeByTeacher(User teacher, Experiment experiment) {
		experiment.setRemarkUser(teacher);
		this.experimentDAO.merge(experiment);
	}

	// System judge
	
	private DeviceService deviceService;
	private DeviceCmd deviceCmd = new DeviceCmd();
	public DeviceService getDeviceService() {
		return deviceService;
	}

	public void setDeviceService(DeviceService deviceService) {
		this.deviceService = deviceService;
	}
	
	public int judgeBySystem(User user, String experimentName, String path) {
		int ret = deviceService.connect(user);
		if(ret != Message.SUCCESS){
			return ret;
		}
		deviceCmd.setType(DeviceCmd.TYPE.DownloadFpgaFromUsb);
		deviceCmd.setFpgaSelector((byte)0);
		deviceCmd.setFileName(path);
		deviceService.executeByUser(user, deviceCmd);
		
		try {
			this.getClass().getMethod(experimentName,
					new Class[] { User.class, String.class }).invoke(this,
					new Object[] { user, path });
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return 0;
	}

	public void dlexp1(User user, String path) {
		//input s0, s1, d, c, b, a;
		int dataBus = 0;
		for(dataBus = 0;  dataBus < 64; dataBus ++){
			
		}
		
	}

	public Cpu getCpuvariables(User current, Cpu cpu) {
		// TODO Auto-generated method stub
		DetachedCriteria criteria = DetachedCriteria .forClass(Cpu.class);
		criteria.add(Restrictions.eq("user", current));
		criteria.add(Restrictions.eq("experimentName", cpu.getExperimentName()));
		List list = cpuDAO.findByCriteria(criteria);
		if(list.size() == 0){
			cpu.setUser(current);
			cpuDAO.save(cpu);
		}else{
			cpu = (Cpu)list.get(0);
		}
		return cpu;
		
	}

	public void saveCpuVariables(User current, Cpu cpu) {
		// TODO Auto-generated method stub
		cpu.setUser(current);
		cpuDAO.attachDirty(cpu);
	}
	
}
