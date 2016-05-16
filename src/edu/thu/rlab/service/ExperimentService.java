package edu.thu.rlab.service;

import com.alibaba.fastjson.JSONArray;

import edu.thu.rlab.pojo.Cpu;
import edu.thu.rlab.pojo.Experiment;
import edu.thu.rlab.pojo.User;

public interface ExperimentService {
	public String select(User user, Experiment experiment);
	
	public JSONArray list(User current);
	
	public void judgeByTeacher(User teacher, Experiment experiment);
	
	public Cpu getCpuvariables(User current, Cpu cpu);
	
	public void saveCpuVariables(User current, Cpu cpu);
}
